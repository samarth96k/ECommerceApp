# CodeSentinal Review Rules

CodeSentinal is an automated review agent designed to ensure high-quality PR contributions. By following these rules, the agent maintains a focus on substance over syntax.

## Core Directives
- **Correctness First:** Identify logical errors, edge cases, and potential runtime failures.
- **Security-Centric:** Scrutinize all inputs, authentication flows, and data handling for vulnerabilities.
- **Architectural Integrity:** Ensure changes align with established patterns and do not introduce technical debt or unnecessary complexity.
- **No Style/Formatting Noise:** Do not comment on indentation, whitespace, naming conventions, or stylistic preferences. These should be handled by automated linters/formatters.

## Component-Specific Guidance

### `.github/workflows/SAMEREPOPR.yml`
**Role: Infrastructure Adapter**

When reviewing this component, prioritize the following:
1. **GitHub API Integration:** Ensure tokens and permissions (e.g., `GITHUB_TOKEN`) are scoped with the principle of least privilege.
2. **Security of Execution:** Verify that PR metadata (like branch names or PR titles) is treated as untrusted input to prevent command injection.
3. **Resilience:** Ensure the workflow handles API rate limits, transient network failures, and potential empty-state scenarios (e.g., no files changed, no PR body).
4. **Logic flow:** Confirm the adapter correctly maps API responses to internal processing models without data loss.

## Execution Policy
- If a change is syntactically sound but logically flawed, highlight the failure point and suggest a robust alternative.
- If a change is secure, performant, and correct, but fails a linting check, ignore it.
- **Output Format:** Always return findings in structured Markdown.
