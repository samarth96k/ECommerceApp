# Repository Memory

This file stores long-term repository knowledge.

## Architectural Decisions

Document major architectural decisions.

---


### Memory ID: a1f0d6932ff2

Created At: 2026-06-06T09:51:15.659Z

**Reason**

Refactoring order handling to support cleaner integration of payment gateways.

**Knowledge**

Adopted the Factory Pattern for payment providers (COD, Stripe, Razorpay) and a Service Layer for order business logic. Future reviewers should ensure new payment integrations follow the established process(order, origin) contract.

---

## Known Constraints

Document repository limitations.

---

## Migration Notes

Document migrations and compatibility concerns.

---

## Review Findings

Document recurring review findings and lessons.

---

## Integration Knowledge

Document external integrations, workflows, and cross-system behavior.
