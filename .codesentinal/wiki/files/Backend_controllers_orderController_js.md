# Purpose
The `orderController.js` file serves as the central orchestration layer for order lifecycle management within the application, handling requests related to order placement, retrieval, cancellation, and associated financial configurations.

# Responsibilities
*   **Order Lifecycle Management:** Facilitates the creation and cancellation of user orders.
*   **Data Retrieval:** Provides endpoints for fetching comprehensive order lists.
*   **Configuration Handling:** Manages environment-specific settings for currency and delivery charge calculations.
*   **Service Coordination:** Integrates with payment services and data models to execute business logic.

# Architectural Role
Application Component (Controller Layer). It acts as the bridge between incoming client requests and the underlying data models and payment services.

# Critical Review Context
The controller relies heavily on environment variables for configuration. When reviewing pull requests, ensure that sensitive data or critical configurations are not hardcoded and that appropriate error handling is in place for missing or malformed environment values.

# Maintenance Notes
*   Ensure that any modifications to order workflows reflect consistent updates in the `orderModel.js`.
*   Maintain alignment with the `paymentService.js` interface when updating order placement or cancellation logic.
*   Utilize the integrated `logger.js` for all operational tracing to ensure visibility during production issues.

# Known Constraints
*   Dependent on the existence and accessibility of the `orderModel`, `productModel`, `userModel`, and `paymentService`.
*   Operational availability is tied to the correct configuration of environment variables.

# Related Components
*   `Backend/models/orderModel.js`
*   `Backend/models/productModel.js`
*   `Backend/models/userModel.js`
*   `Backend/services/paymentService.js`
*   `Backend/utils/logger.js`

# Repository Memory
This controller implements high-risk transaction logic. Previous reviews have highlighted the necessity of verifying secret handling within the environment variable implementation. Future changes should prioritize auditability and the robustness of payment-related state transitions.
