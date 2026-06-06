# Architecture Documentation

This document provides a high-level overview of the repository structure and architecture to assist in code review processes.

## Architecture Overview
The repository follows a decoupled architecture consisting of a Node.js-based Backend, a client-facing Frontend, and an Admin panel. Orchestration for repository-level automation is handled via GitHub Actions.

## Major Modules

### 1. Backend (API Layer)
The backend is organized into a modular structure focused on separation of concerns:
*   **Controllers:** Contains business logic for core entities (`cart`, `order`, `product`, `user`).
*   **Routes:** Defines API endpoints and maps them to controller functions.
*   **Models:** Mongoose schemas defining the data structure for MongoDB (`orderModel`, `productModel`, `userModel`).
*   **Middleware:** Interceptors for authentication (`admin_auth`, `auth`) and file handling (`multer`).
*   **Configuration:** Integration logic for external services (Cloudinary) and database connection (MongoDB).
*   **Entrypoint:** `Backend/server.js` initializes the Express application.

### 2. Frontend & Admin
The repository maintains two distinct React-based applications:
*   **Frontend:** Entrypoint `Frontend/src/main.jsx`.
*   **Admin Panel:** Entrypoint `admin/src/main.jsx`.
*   Both utilize independent `eslint.config.js` files to ensure code quality and style consistency within their respective scopes.

### 3. Infrastructure Adapter
*   **GitHub Actions:** `.github/workflows/SAMEREPOPR.yml` acts as the infrastructure layer, managing interactions with the GitHub API for automated Pull Request operations.

## Data Flow
1.  **Request Initiation:** Incoming requests hit the `Backend/server.js` entrypoint.
2.  **Authentication/Validation:** Requests are passed through middleware (e.g., `authUser` or `adminAuth`) to verify identity.
3.  **Processing:** Validated requests are routed to specific controllers which interact with Mongoose models to perform CRUD operations on the MongoDB database.
4.  **External Sync:** File-related operations (such as product uploads) integrate with Cloudinary via `Backend/config/cloudinary.js`.
5.  **Response:** Controllers return the appropriate data or status codes back through the routes.

## Review Implications
When reviewing Pull Requests, please adhere to the following guidelines:

*   **Backend Logic:** Ensure changes to controllers do not bypass middleware authentication. Verify that new routes are correctly mapped in the `routes/` directory.
*   **Model Schema:** Changes to models must be backwards compatible with existing MongoDB collections.
*   **Frontend/Admin:** Ensure that updates to `main.jsx` do not violate rules defined in the corresponding `eslint.config.js`.
*   **Automation:** Changes to `SAMEREPOPR.yml` must be reviewed for security implications regarding GitHub API permissions and automated PR behavior.
*   **Dependencies:** Any changes to `package.json` or `package-lock.json` in the backend should be audited for security vulnerabilities.
