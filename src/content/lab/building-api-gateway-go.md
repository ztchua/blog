---
title: "Building a High-Performance API Gateway in Go"
subtitle: "How we achieved sub-10ms P99 latency with a custom radix-tree router and connection pooling"
date: "April 12, 2026"
readTime: "12 min read"
series: "Systems Engineering"
---

## The Challenge {#introduction}

Our platform was outgrowing its Node.js API gateway. At 50K requests per second, the single-threaded event loop was becoming a bottleneck. We needed something faster — something that could handle 200K+ RPS without breaking a sweat.

After evaluating our options (Envoy, Nginx, Kong), we decided to build a custom gateway in Go. The reason was simple: we needed fine-grained control over routing, middleware composition, and connection management that off-the-shelf solutions couldn't provide without significant complexity.

## Architecture Overview {#architecture}

The gateway is built around three core components: a radix-tree router for O(k) path matching, a middleware pipeline using Go's elegant handler composition, and a connection pool manager with circuit breaking.

The key insight was treating the gateway as a "smart proxy" rather than a traditional reverse proxy. Every request goes through a pipeline of composable middleware — rate limiting, authentication, request transformation, and observability are all modular stages.

## The Radix Tree Router {#router}

The router was the biggest win. By replacing regex-based route matching with a compressed radix trie, we reduced P99 routing latency from 2.3ms to 0.04ms. That's a 57x improvement on just the routing layer.

```go:router/radix.go
// Router implements a compressed radix tree
// for O(k) path lookup where k = path length
type Router struct {
    tree *node
}

type node struct {
    path     string
    children []*node
    handler  HandlerFunc
    priority int
}

// Match finds the handler for a given path
func (r *Router) Match(path string) HandlerFunc {
    return r.tree.search(path)
}

func (n *node) search(path string) HandlerFunc {
    if len(path) == 0 {
        return n.handler
    }

    for _, child := range n.children {
        if path[0] == child.path[0] {
            prefix := longestCommonPrefix(path, child.path)
            if len(prefix) == len(child.path) {
                return child.search(path[len(prefix):])
            }
        }
    }

    return nil
}
```

## Middleware Pipeline {#middleware}

Go's first-class function support makes middleware composition incredibly elegant. Each middleware is a function that takes a handler and returns a handler — a pattern that naturally composes into a chain.

The ordering of middleware matters critically. We put observability on the outside (to measure total latency including middleware overhead) and authentication closer to the handler (to avoid expensive token validation on rate-limited requests).

```go:middleware/pipeline.go
// Middleware wraps a HandlerFunc with additional behavior
type Middleware func(HandlerFunc) HandlerFunc

// Chain composes multiple middleware into one
func Chain(middlewares ...Middleware) Middleware {
    return func(next HandlerFunc) HandlerFunc {
        for i := len(middlewares) - 1; i >= 0; i-- {
            next = middlewares[i](next)
        }
        return next
    }
}

// RequestID injects a unique identifier
func RequestID(next HandlerFunc) HandlerFunc {
    return func(w ResponseWriter, r *Request) {
        id := uuid.New().String()
        r.Header.Set("X-Request-ID", id)
        w.Header().Set("X-Request-ID", id)
        next(w, r)
    }
}

// RateLimit applies per-client rate limiting
func RateLimit(rps int) Middleware {
    limiter := tollbooth.NewLimiter(rps, nil)
    return func(next HandlerFunc) HandlerFunc {
        return func(w ResponseWriter, r *Request) {
            if limiter.Allow(r.RemoteAddr) {
                next(w, r)
            } else {
                w.WriteHeader(429)
            }
        }
    }
}
```

## Connection Pool Management {#connection-pooling}

Connection reuse was our second biggest win. By implementing a smart connection pool with health checking, circuit breaking, and adaptive sizing, we eliminated the TCP handshake overhead for 95% of requests.

The pool monitors upstream health via continuous probing. When a backend starts returning 5xx errors, the circuit breaker trips within 100ms, redirecting traffic to healthy instances. Recovery is gradual — we slowly reintroduce traffic to the previously-failing backend to avoid thundering herd.

```go:pool/manager.go
// Pool manages upstream connections with circuit breaking
type Pool struct {
    connections chan *Connection
    health      *HealthChecker
    circuit     *CircuitBreaker
    maxSize     int
}

// Acquire gets a healthy connection from the pool
func (p *Pool) Acquire(ctx context.Context) (*Connection, error) {
    if p.circuit.IsOpen() {
        return nil, ErrCircuitOpen
    }

    select {
    case conn := <-p.connections:
        if conn.IsHealthy() {
            return conn, nil
        }
        p.health.MarkUnhealthy(conn)
        return p.Acquire(ctx) // retry
    case <-ctx.Done():
        return nil, ctx.Err()
    default:
        return p.createNew()
    }
}
```

## Results & Benchmarks {#results}

After 3 months of development and optimization, the results exceeded our expectations:

• **P99 latency**: 8ms (down from 45ms with Node.js)
• **Throughput**: 210K RPS sustained, 350K RPS burst
• **Memory**: 128MB steady state (vs 2.1GB for Node.js)
• **CPU**: 12% utilization at peak (vs 85%)
• **Cold start**: 200ms (vs 8 seconds)

The biggest unexpected benefit was operational simplicity. Go's single-binary deployment model meant our Docker images went from 1.2GB to 12MB, and deployments became nearly instant.
