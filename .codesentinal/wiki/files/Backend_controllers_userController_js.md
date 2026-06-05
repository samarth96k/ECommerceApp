# Purpose
To serve as the primary controller for user lifecycle management, specifically handling authentication, registration, and token generation processes within the CodeSentinal backend.

# Responsibilities
*   Facilitating user registration via `registerUser`.
*   Managing user authentication processes through `loginUser` and `adminLogin`.
*   Executing secure token generation logic via `createToken`.
*   Interfacing with the user data layer to persist and retrieve account information.

# Architectural Role
Application Component. This controller acts as the intermediary between incoming API requests and the underlying user data models, enforcing authentication business logic.

# Critical Review Context
The controller relies heavily on environment variables for sensitive operations. Reviewers must confirm that secret management is implemented securely and that the application handles cases where these variables are undefined or missing to prevent runtime failures or security exposures.

# Related Components
*   **Backend/models/userModel.js**: The data schema and database interaction layer that defines the structure of user objects processed by this controller.

# Repository Memory
When reviewing changes to this file, prioritize the validation of authentication security. Ensure that any modifications to `createToken` or login flows do not introduce vulnerabilities related to insecure secret handling or improper token validation. Always verify that changes align with the data structure enforced by `userModel.js`.
