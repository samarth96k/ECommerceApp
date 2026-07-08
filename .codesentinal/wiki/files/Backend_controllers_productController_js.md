# Purpose
The `productController.js` serves as the primary interface for managing product-related operations and review lifecycles within the backend application.

# Responsibilities
- Implementing core repository functionality for product and review management.
- Exposing endpoints for creating/updating reviews, adding products, deleting reviews, generating review summaries, and listing products.

# Architectural Role
Application Component. It acts as the controller layer, mediating between incoming requests and the underlying data models and services.

# Critical Review Context
When reviewing PRs involving this file, prioritize risk mitigation, specifically concerning data parsing and input validation. 

# Maintenance Notes
- Ensure all logic maintains consistency with the underlying database schemas.
- When modifying logic, verify that interactions with the caching layer remain synchronized with database state updates.

# Known Constraints
- The controller performs JSON parsing, which necessitates strict verification to ensure malformed JSON input is handled safely without crashing the application.

# Related Components
- **Data Models:** `Backend/models/productModel.js`, `Backend/models/userModel.js`
- **Caching:** `Backend/config/redis.js`
- **Services:** `Backend/services/reviewSummaryService.js`
- **Utilities:** `Backend/utils/logger.js`

# Repository Memory
- **Risk Assessment:** The reliance on JSON parsing requires defensive coding practices to prevent service disruption from invalid input.
- **Dependency Management:** The controller tightly couples with `productModel`, `userModel`, and `reviewSummaryService`; any changes to these dependencies should trigger an immediate review of the controller logic.
