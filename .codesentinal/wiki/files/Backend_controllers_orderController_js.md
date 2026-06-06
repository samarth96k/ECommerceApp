# Purpose
The `orderController.js` serves as the primary orchestration layer for order lifecycle management within the application, facilitating retrieval, pricing, and payment processing.

# Responsibilities
- Handling order retrieval operations (`allOrders`).
- Calculating financial components including currency settings and delivery charges.
- Managing order placement flows, including standard placement and third-party integration via Razorpay.

# Architectural Role
Application Component acting as a controller layer that mediates between the API endpoints and the underlying persistence models.

# Critical Review Context
The controller is a critical surface for security and data integrity. Reviewers must prioritize validating that all incoming request parameters are sanitized and that transaction logic is robust. Special attention is required for the integration of third-party payment gateways to ensure callbacks and signatures are handled securely.

# Related Components
- `Backend/models/orderModel.js`: Data schema for order persistence.
- `Backend/models/userModel.js`: Data schema for user-related order history and validation.

# Repository Memory
- **Security Warning:** The controller relies heavily on environment variables for sensitive configurations (such as API keys and secrets). During PR reviews, verify that these secrets are not hardcoded and that proper error handling is implemented to prevent sensitive information leakage if environment variables are missing or misconfigured.
- **Dependency coupling:** Any modifications to the `orderModel` or `userModel` schema will likely require corresponding updates in the logic within this controller.
