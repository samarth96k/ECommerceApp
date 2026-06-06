# Repository Memory

This file stores long-term repository knowledge.

## Architectural Decisions

Document major architectural decisions.

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


### Memory ID: 37252fdbdb1e

Created At: 2026-06-06T09:51:15.660Z

**Reason**

Standardizing error response schema.

**Knowledge**

Controllers now use a consistent JSON error response schema: { success: false, message: string }. All new controller endpoints should adhere to this error structure.

---
