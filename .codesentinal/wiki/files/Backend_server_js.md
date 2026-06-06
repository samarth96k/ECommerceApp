# Purpose
`Backend/server.js` serves as the primary entry point for the application, responsible for initializing the server instance, defining the operational port, and orchestrating the integration of core configurations and routing modules.

# Responsibilities
*   Initializing the application (`app`) instance.
*   Configuring the server port.
*   Integrating external service configurations (Cloudinary, MongoDB).
*   Mounting API route handlers for users, products, orders, and shopping carts.

# Architectural Role
Application Component. This file acts as the central hub for the backend service, connecting the server environment to the data layer, third-party asset management, and the business logic defined in the route modules.

# Critical Review Context
*   **Risk Mitigation:** The application relies heavily on environment variables for configuration. During reviews, it is essential to verify that there is adequate error handling for missing or malformed secrets to prevent runtime failures.
*   **Security:** Ensure that environment-specific configurations are correctly scoped and that no sensitive credentials are hardcoded.

# Related Components
*   `Backend/config/cloudinary.js`
*   `Backend/config/mongodb.js`
*   `Backend/routes/cartRoutes.js`
*   `Backend/routes/orderRoute.js`
*   `Backend/routes/productRoute.js`
*   `Backend/routes/userRoute.js`

# Repository Memory
*   This file is the backbone of the backend server; changes here affect the entire routing structure and global application startup.
*   Future modifications involving new routes must be registered here to be reachable by the client.
*   Always check if new environment variables added here are documented in the project's configuration requirements.
