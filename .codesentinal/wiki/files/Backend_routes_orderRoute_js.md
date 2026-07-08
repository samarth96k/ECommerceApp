# Purpose
The `orderRoute.js` file serves as the central routing definition for all order-related operations within the application, mapping incoming requests to their respective controller functions.

# Responsibilities
- Defining the `orderRouter` instance.
- Routing order-related requests to the appropriate handlers in `orderController` and `adminController`.
- Applying authentication and authorization middleware to protect order endpoints.

# Architectural Role
This file acts as an Application Component, specifically serving as the entry point for the order management layer of the backend API.

# Critical Review Context
When reviewing PRs modifying this file, focus primarily on:
- **Business Logic Correctness:** Ensure that route mappings correctly reflect the intended order workflows and state transitions.
- **Access Control:** Verify that the correct middleware (`auth.js` vs `admin_auth.js`) is applied to sensitive endpoints to prevent unauthorized access.

# Maintenance Notes
- Ensure any new order-related functionality is registered here with appropriate middleware protection.
- Keep route definitions consistent with existing naming conventions to maintain API discoverability.

# Known Constraints
None.

# Related Components
- `Backend/controllers/orderController.js`
- `Backend/controllers/adminController.js`
- `Backend/middleware/auth.js`
- `Backend/middleware/admin_auth.js`

# Repository Memory
- This component functions as the primary interface between HTTP requests and the backend business logic for orders.
- It enforces a strict separation between user-facing order actions and administrative order oversight through the use of distinct middleware modules.
