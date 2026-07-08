# Coding Rules & Review Expectations

This document outlines the mandatory standards and review requirements for this repository to ensure security, maintainability, and code quality.

---

## 1. Security & Infrastructure (GitHub Actions)

### Workflow Security (`.github/workflows/`)
*   **Minimal Permissions:** All workflow files must explicitly define `permissions`. Avoid `permissions: write-all`. Use the principle of least privilege (e.g., `contents: read`).
*   **Trigger Safety:** PR triggers must be validated. Ensure `pull_request` triggers do not execute untrusted code from forks without approval if they require secrets.
*   **Secret Handling:** 
    *   Secrets must never be hardcoded or logged. 
    *   Environment variables used in workflows must be passed via `env` blocks using `${{ secrets.SECRET_NAME }}` syntax.
    *   Any workflow requiring secrets must explicitly define the dependency in the `jobs.<job_id>.env` or step level.

### Configuration Safety
*   **JSON Parsing:** Any step that parses JSON (e.g., in shell scripts or JS actions) must implement error handling (e.g., `try-catch` blocks or `|| exit 1`) to prevent failures on malformed input.
*   **Infrastructure (Docker):** `docker-compose.yml` files must not contain plaintext credentials. Use `.env` files (excluded from git) or GitHub Secrets injected at runtime.

---

## 2. TypeScript & Type Safety

### Eliminating `any`
The usage of `any` bypasses the benefits of TypeScript and introduces runtime risks.
*   **Prohibition:** The use of `any` is strictly discouraged. 
*   **Alternative:** 
    *   Use `unknown` for values with indeterminate types, requiring a type guard or assertion before use.
    *   Define explicit `interface` or `type` definitions for complex data structures.
*   **Reviewers:** Reject any PR introducing `any` unless accompanied by a technical debt ticket and an explicit justification.

---

## 3. Linting & Code Style

### ESLint Configuration
We maintain separate configurations for different domains to ensure context-specific rule enforcement:
*   `frontend/eslint.config.js`
*   `admin/eslint.config.js`

**Expectations:**
*   **Consistency:** Do not modify existing ESLint rules without discussion in a PR or issue.
*   **Pre-commit:** Ensure `npm run lint` passes locally before pushing. 
*   **CI Enforcement:** CI pipelines will automatically fail if linting rules are violated. Reviewers should not ignore CI linting failures.

---

## 4. Code Review Checklist (PR Requirements)

Before approving a PR, reviewers must verify:

1.  **Security/Secrets:** No sensitive data (keys, tokens) is present in the diff. Environment variables are sourced correctly.
2.  **Type Safety:** No new `any` types have been introduced.
3.  **Error Handling:** JSON parsing logic is wrapped in safety checks.
4.  **Workflows:** 
    *   Are permissions restricted?
    *   Are secrets accessed safely?
    *   Does the logic handle unexpected inputs gracefully?
5.  **Documentation:** Are changes to infrastructure or core logic documented in this file or the respective `README.md`?

---

## 5. Handling Detected Risks

If a reviewer identifies a risk (e.g., usage of `any`, unsafe JSON parsing, or missing secrets handling), the following workflow applies:

1.  **Flagging:** The reviewer must tag the specific code block with a comment referencing this `coding-rules.md`.
2.  **Resolution:** The author must either refactor the code to meet these standards or provide a compelling architectural reason why a deviation is required (which must be documented as an exception).
3.  **Verification:** CI checks will act as the "Source of Truth" for linting and structural failures. Manual review acts as the "Source of Truth" for logic and security.
