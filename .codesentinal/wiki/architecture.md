# Repository Architecture

This document outlines the architectural structure of the repository to facilitate effective Pull Request reviews.

## Architecture Overview
The repository follows a multi-tier structure consisting of a Node.js-based backend, a frontend client, and an admin management interface. CI/CD automation is handled via GitHub Actions.

## Major Modules

### 1. Backend
The backend serves as the core API and data management layer.
*   **Entrypoint:** `Backend/server.js` initializes the Express application and defines the base server configuration.
*   **Routing:** Organized by domain (`cartRoutes.js`, `orderRoute.js`, `productRoute.js`, `userRoute.js`), routing requests to their respective controllers.
*   **Controllers:** Implement business logic (e.g., `productController.js` for product management, `orderController.js` for transactional logic, `userController.js` for authentication).
*   **Models:** Define Mongoose schemas for data persistence (`userModel.js`, `productModel.js`, `orderModel.js`).
*   **Middleware:** Manages cross-cutting concerns, including authentication (`auth.js`, `admin_auth.js`) and file uploads (`multer.js`).
*   **Configuration:** Manages external service integration (Cloudinary for media, MongoDB for database connectivity).

### 2. Frontend & Admin
The repository contains two distinct client-side applications:
*   **Frontend:** The public-facing client (`Frontend/src/main.jsx`).
*   **Admin:** The administrative interface (`admin/src/main.jsx`).
*   **Configuration:** Both maintain individual ESLint configurations (`eslint.config.js`) to enforce code quality standards.

### 3. Infrastructure
*   **GitHub Actions:** The file `.github/workflows/SAMEREPOPR.yml` acts as the Infrastructure Adapter, managing automated pull request operations and integration with the GitHub API.

## Data Flow
1.  **Client Request:** Requests originate from the Frontend or Admin portals.
2.  **Middleware Processing:** Requests pass through authentication or multipart/form-data middleware (Multer) as required.
3.  **Controller Execution:** Controllers process logic, interacting with the MongoDB models to fetch or persist data.
4.  **External Services:** Media-related data is processed via the Cloudinary configuration.
5.  **Automation:** CI/CD workflows monitor pull request activity to ensure repository integrity during the merge process.

## Review Implications
When reviewing PRs, consider the following:

*   **Middleware Impact:** Changes to `admin_auth.js` or `auth.js` affect security across all routes. Ensure any modifications do not expose unauthorized endpoints.
*   **Controller/Model Coupling:** Modifications to models (e.g., `orderModel.js`) require corresponding updates in the associated controllers (`orderController.js`) to prevent runtime errors.
*   **Routing Integrity:** Verify that new routes added in `Backend/routes/` are correctly registered in `server.js` and have appropriate middleware protection.
*   **CI/CD Workflow:** Changes to `SAMEREPOPR.yml` impact the automated PR verification process; ensure changes to the GitHub API integration are backward compatible.
*   **Linting Consistency:** Ensure that changes in either `Frontend` or `admin` directories adhere to their respective `eslint.config.js` requirements.
