# Purpose
To define the `productRouter` and serve as the routing entry point for product-related operations within the application.

# Responsibilities
Manages incoming HTTP requests for product-related endpoints and delegates logic to the appropriate controllers and middleware.

# Architectural Role
Application Component acting as the routing layer for the product module.

# Critical Review Context
Reviews should focus on business logic correctness, specifically ensuring that routes correctly map to the intended controller methods and are protected by the appropriate security and file-handling middleware.

# Related Components
- **Backend/controllers/productController.js**: Executes the core business logic triggered by these routes.
- **Backend/middleware/admin_auth.js**: Provides authentication/authorization security for administrative product actions.
- **Backend/middleware/multer.js**: Handles file upload processing for product data.

# Repository Memory
- The router serves as the integration point between HTTP request handling, administrative authorization, and file management services. 
- Ensure any additions to this route file maintain consistency with existing authentication and file handling patterns.
