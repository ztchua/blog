---
date: "2026-04-12"
tags: ["go", "performance", "networking"]
likes: 127
replies: 15
---

Reduced our API gateway latency from 45ms to 8ms by switching from regex-based routing to a radix tree. Sometimes the fundamentals matter more than the framework.

```go
// Radix tree router - O(k) lookup
func (r *Router) Match(path string) *Route {
    return r.tree.Search(path)
}
```
