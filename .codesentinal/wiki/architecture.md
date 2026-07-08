# Repository Architecture

This document provides a high-level overview of the repository architecture to assist in PR reviews and architectural understanding.

## Overview
The repository follows a monolithic structure containing three distinct application modules: a Node.js backend and two React-based frontend applications (Client and Admin). Infrastructure is managed via Docker and GitHub Actions.

## Major Modules

### 1. Backend
Located in the `Backend/` directory, this module serves as the central API and data processing engine.
*   **Entrypoint**: `server.js`
*   **Database/Storage**: Utilizes MongoDB (`config/mongodb.js`), Redis (`config/redis.js`), and Cloudinary (`config/cloudinary.js`).
*   **AI Integration**: Features Gemini AI integration (`config/gemini.js`).
*   **Controllers**: Logic is modularized by domain:
    *   `adminController`: Dashboard, order, and payment management.
    *   `cartController`: User shopping cart operations.
    *   `orderController`: Order processing, delivery logic, and currency.
    *   `productController`: Product management and review system.
    *   `userController`: Authentication, token management, and address handling.
*   **Middleware**: Security and request processing:
    *   **Auth**: `admin_auth`, `auth`, `profileAuth` for role-based access control.
    *   **Security**: `rateLimiter` (auth, general, and order-specific) and `multer` for file uploads.

### 2. Frontend (Client & Admin)
*   **Client Entrypoint**: `Frontend/src/main.jsx`
*   **Admin Entrypoint**: `admin/src/main.jsx`
*   **Configuration**: Each module maintains its own `eslint.config.js` to ensure code consistency and linting standards.

## Data Flow
1.  **Request Initiation**: Client requests are intercepted by `Backend/middleware/rateLimiter` to ensure service stability.
2.  **Authentication**: Requests pass through specialized middleware (`admin_auth.js`, `auth.js`, or `profileAuth.js`) to validate user context.
3.  **Controller Execution**: Validated requests are routed to specific controllers which interact with the `models/` (order, product, user) to perform CRUD operations.
4.  **External Services**: Controllers may invoke external services via `config/` (Cloudinary for media, Gemini for AI features, Redis for caching, MongoDB for persistence).
5.  **Response**: Data is processed and returned to the calling frontend module.

## Infrastructure & Automation
*   **Containerization**: `docker-compose.yml` is used to orchestrate the backend and database services.
*   **CI/CD**: `.github/workflows/SAMEREPOPR.yml` acts as the infrastructure adapter, managing GitHub API interactions and automated pull request operations.

## Review Implications
When reviewing PRs, ensure the following constraints are maintained:
*   **Middleware Usage**: Any new endpoint must implement appropriate rate limiting and authorization middleware.
*   **Separation of Concerns**: Business logic should remain in the `controllers/` folder, while schema definitions stay in `models/`.
*   **Configuration**: Any changes to database, cache, or external AI connections should be isolated within the `config/` directory.
*   **Linting**: Ensure PRs adhere to the existing `eslint.config.js` configurations in the respective frontend directories.
*   **Security**: Modifications to auth middleware or rate limiters require careful evaluation due to their impact on system-wide access control.
