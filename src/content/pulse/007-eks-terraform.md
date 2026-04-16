---
date: "2026-04-08"
tags: ["aws", "terraform", "eks"]
likes: 91
replies: 18
---

Provisioned a complete EKS cluster with Terraform + ArgoCD in 12 minutes today. Infrastructure as Code when done right is genuinely magical. The initial investment pays dividends every single deploy.

```hcl
module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = "production"
  cluster_version = "1.29"
}
```
