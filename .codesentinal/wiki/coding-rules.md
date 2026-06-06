# Coding Rules & Review Expectations

This document outlines the mandatory standards for contributions to this repository. All Pull Requests (PRs) must adhere to these guidelines to ensure security, maintainability, and code quality.

---

## 1. Security & Workflow Standards

### GitHub Actions (`.github/workflows/`)
*   **Minimal Permissions:** All workflows must explicitly define `permissions`. Avoid `permissions: write-all`. Grant only the minimum scopes required (e.g., `contents: read`).
*   **Secret Handling:** 
    *   Never hardcode credentials or tokens in workflows.
    *   All external inputs must be pulled from `${{ secrets.SECRET_NAME }}`.
    *   Ensure any environment variable usage is sanitized; verify existence before usage.
*   **Input Validation:** Workflows parsing JSON (e.g., from PR titles or body) must include error handling. Use `try/catch` or conditional checks to ensure invalid JSON does not cause pipeline failure or injection risks.
*   **Trigger Safety:** Avoid triggering workflows on untrusted PR sources. Use `pull_request_target` only if absolutely necessary and strictly validate the base branch and user permissions.

### Environment Variables
*   **Validation:** All environment variables used by the application must be validated at runtime (e.g., using `zod` or a simple existence check). If a required variable is missing, the application must throw a descriptive error and exit.

---

## 2. Code Quality & Type Safety

### TypeScript Standards
*   **The `any` Ban:** The use of `any` is strictly prohibited.
    *   **Exceptions:** Must be approved by a senior engineer and accompanied by a `// eslint-disable-line @typescript-eslint/no-explicit-any` comment explaining the necessity.
    *   **Refactoring:** Aim for `unknown` or specific interfaces/types to maintain type safety.
*   **Type Coverage:** Prefer explicit typing for function return values and parameters.

### Linting Configuration
We enforce consistent code styles across distinct project areas:
*   **Frontend:** Follow `frontend/eslint.config.js`.
*   **Admin Dashboard:** Follow `admin/eslint.config.js`.

**Reviewers:** Ensure that no PR ignores linting rules without a valid architectural justification.

---

## 3. Pull Request Review Checklist

Before approving a PR, reviewers must verify the following:

- [ ] **Security:** Are there any hardcoded secrets or unsafe environment variable usage?
- [ ] **Permissions:** Does the workflow file restrict GITHUB_TOKEN scope?
- [ ] **Type Safety:** Are there any new `any` types introduced?
- [ ] **Robustness:** If JSON is parsed, is there logic to handle malformed data?
- [ ] **Linting:** Does the code pass the relevant `eslint.config.js` for the module being modified?
- [ ] **Secrets:** Are all required environment variables properly referenced through the secrets manager?

---

## 4. Addressing Risks
If a PR introduces code flagged by the automated security analysis (e.g., detected usage of `any` or potentially unsafe JSON parsing), the author is responsible for:
1.  **Refactoring** the code to satisfy type safety.
2.  **Adding explicit validation** for environment variables/JSON inputs.
3.  **Updating the PR description** to explain how the potential risk was mitigated.

*By submitting a PR, you acknowledge that you have reviewed the code against these standards.*
