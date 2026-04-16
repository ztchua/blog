---
date: "2026-04-10"
tags: ["wasm", "rust", "performance"]
likes: 203
replies: 31
---

Been experimenting with WebAssembly for compute-heavy browser tasks. Processing 10M data points in a dashboard went from 3.2s (JS) to 280ms (WASM). The future of web performance is here.

```rust
#[wasm_bindgen]
pub fn process_batch(data: &[f64]) -> Vec<f64> {
    data.par_iter()
        .map(|&x| x.sqrt() * 2.0)
        .collect()
}
```
