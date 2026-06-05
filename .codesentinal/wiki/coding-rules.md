# Coding Rules & Review Expectations

This document outlines the mandatory standards and review criteria for all contributions to this repository. Reviewers are expected to enforce these rules during the Pull Request (PR) process.

---

## 1. GitHub Actions & CI/CD Security
All workflow files (`.github/workflows/*.yml`) must adhere to the principle of least privilege.

*   **Permissions:** Every workflow must explicitly define `permissions`. Avoid `permissions: write-all`. Use the minimum scope required (e.g., `contents: read`).
*   **Secret Handling:** Never access secrets directly via `env` if they can be injected into specific steps. Ensure all sensitive values are masked.
*   **JSON Parsing:** When parsing JSON in workflow steps (e.g., `fromJSON`), ensure the input is sanitized or validated to prevent injection or crashes on malformed data.
*   **Trigger Safety:** Avoid dangerous triggers like `pull_request_target` on untrusted branches unless strict commit SHA pinning is enforced.

## 2. Type Safety & Code Quality
We prioritize strict type safety to maintain long-term maintainability.

*   **Avoid `any`:** The use of `any` is strictly prohibited. If a type is unknown, use `unknown` and perform explicit type narrowing.
*   **Type Assertions:** Minimize the use of type assertions (`as Type`). Prefer type guards or Zod schemas for runtime data validation.
*   **Environment Variables:**
    *   Do not access `process.env` directly in application logic.
    *   Use a centralized configuration module (e.g., `src/config.ts`) that validates environment variables at startup using a schema validator.
    *   Ensure all missing required variables throw an explicit, helpful error during the build or boot process.

## 3. Linting Standards
We use modular ESLint configurations to maintain consistency across different project subdirectories.

*   **Frontend (`frontend/eslint.config.js`):** Focuses on React/Web best practices, hooks dependency rules, and accessibility.
*   **Admin (`admin/eslint.config.js`):** Follows stricter backend-integrated patterns and administrative UI constraints.
*   **Enforcement:** CI pipelines will fail if linting errors or warnings are present. Do not use `--no-verify` or ignore rules unless explicitly approved by a lead maintainer.

## 4. Reviewer Checklist
Before approving a PR, ensure the author has addressed the following:

- [ ] **Security:** Are there any new workflow files? Do they follow the "Minimal Permissions" rule?
- [ ] **Secrets:** Are there any hardcoded credentials or improperly handled `env` variables?
- [ ] **Type Safety:** Has the author introduced `any` types? Are they using `unknown` where appropriate?
- [ ] **JSON:** Is any dynamic JSON input properly handled/validated?
- [ ] **Linting:** Does the code pass the relevant `eslint.config.js` rules for the specific directory?

---

### How to deviate from these rules
If a specific technical constraint forces a deviation (e.g., a necessary `any` for a legacy library integration), please:
1.  Add a `// eslint-disable-next-line` comment explaining *why* it is necessary.
2.  Open an issue to track technical debt for removing this workaround.
3.  Request explicit approval from a Senior Maintainer in the PR description.
