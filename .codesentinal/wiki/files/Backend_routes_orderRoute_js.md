# Purpose
To define the `orderRouter` within the application, serving as the entry point for handling order-related requests.

# Responsibilities
Acts as a routing layer that delegates incoming requests to the appropriate order controller methods, while enforcing necessary authentication and authorization policies.

# Architectural Role
Application Component.

# Critical Review Context
Reviews should prioritize the correctness of the business logic implemented in the associated controller and ensure that authentication/authorization middleware is correctly applied to routes based on user roles.

# Related Components
- **Backend/controllers/orderController.js**: Contains the core business logic executed by the routes.
- **Backend/middleware/admin_auth.js**: Used for securing administrative order operations.
- **Backend/middleware/auth.js**: Used for securing standard user-level order operations.

# Repository Memory
The `orderRouter` is centralized within the backend infrastructure. It relies on a combination of standard user authentication and administrative authorization middleware to guard order-related actions. Future modifications to route paths or security requirements should be cross-referenced with the existing middleware configuration in the controller and auth files.
