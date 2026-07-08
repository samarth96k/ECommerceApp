# Purpose
The `userController.js` file serves as the centralized interface for managing user-related operations, including administrative authentication, user address management, and token-based session handling.

# Responsibilities
*   **Authentication:** Orchestrates administrative login procedures.
*   **User Data Management:** Handles the creation and deletion of user addresses.
*   **Session Security:** Manages token generation for authorized access.
*   **Data Persistence:** Interacts with the data layer to perform repository-level operations for user entities.

# Architectural Role
This file functions as an Application Component within the backend architecture, acting as the controller layer that bridges incoming requests with the business logic and data models.

# Critical Review Context
Reviews must prioritize risk mitigation, specifically focusing on security and data integrity. All operations involving administrative access or sensitive user data modifications require strict validation.

# Maintenance Notes
*   Ensure that any changes to address management logic are synchronized with the `userModel.js` schema requirements.
*   Log all significant administrative actions and security-related events using the provided logger utility.

# Known Constraints
*   The controller relies heavily on environment variables for configuration. 
*   Missing or malformed environment variables could lead to service instability or unauthorized access vulnerabilities.

# Related Components
*   **Backend/models/userModel.js:** The underlying schema definition that dictates data structure and validation rules for user entities.
*   **Backend/utils/logger.js:** The logging service used for audit trails and error reporting.

# Repository Memory
*   **Security Audit:** A primary concern for this component is the handling of secrets within environment variables; reviewers must verify that no secrets are hardcoded and that proper error handling exists for missing environment configurations.
*   **Operational Flow:** This controller encapsulates repository-level functionality; modifications here typically require regression testing of authentication flows and address state consistency.
