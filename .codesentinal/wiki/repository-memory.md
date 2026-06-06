# Repository Memory

This file stores long-term repository knowledge.

## Architectural Decisions

Document major architectural decisions.

---


### Memory ID: a7a3072976b5

Created At: 2026-06-06T09:51:15.660Z

**Reason**

Decoupling business logic from controllers.

**Knowledge**

Authentication, user validation, and user creation logic have been moved from controllers to 'userControllerAddedFunc.js'. Future authentication changes must be performed in this file to maintain consistency.

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
