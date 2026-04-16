---
date: "2026-04-07"
tags: ["postgresql", "architecture"]
likes: 156
replies: 27
---

Today I learned that PostgreSQL's LISTEN/NOTIFY can replace Redis pub/sub for many use cases. Fewer moving parts, ACID guarantees, and you already have it running. Sometimes the best tool is the one you already have.
