# Purpose

`orderController.js` serves as the primary controller for order management within the backend, handling order retrieval, payment integration, and delivery fee calculations.

# Responsibilities

- Retrieving all order records.
- Calculating and managing delivery charges.
- Facilitating order placement via standard methods.
- Integrating and processing payments through the Razorpay gateway.
- Exposing currency configurations for order processing.

# Architectural Role

Application Component: Acts as the controller layer responsible for orchestrating order business logic and mediating between incoming requests and the underlying data models.

# Critical Review Context

- **Risk Mitigation:** The controller relies heavily on environment variables for sensitive operations.
- **Security Check:** Future reviews must prioritize verifying that secrets (such as Razorpay API keys or other sensitive credentials) are handled securely and are not missing or improperly exposed.

# Related Components

- `Backend/models/orderModel.js`: Defines the schema and data structure for orders.
- `Backend/models/userModel.js`: Manages user data required for linking and validating orders.

# Repository Memory

- The controller interface handles both standard order placement and third-party payment provider integration (Razorpay).
- Maintenance should prioritize validating the integrity of environment variable loading during the startup phase.
- Ensure all new logic involving the `orderModel` or `userModel` maintains data consistency during the `placeOrder` lifecycle.
