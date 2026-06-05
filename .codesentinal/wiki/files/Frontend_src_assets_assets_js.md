# Purpose
To serve as the central definition and source of truth for product data within the frontend application.

# Responsibilities
- Define the product catalog structure.
- Maintain the persistent state of available items for the frontend.

# Architectural Role
Application Component. Acts as a data-layer utility providing static repository functionality.

# Critical Review Context
When reviewing PRs related to this file, prioritize the verification of business logic correctness regarding product attributes, pricing, and categorization. Ensure any modifications to product definitions align with data schema expectations across the application.

# Related Components
- Frontend product display modules (consumers of product data).

# Repository Memory
- This file acts as the primary registry for application products.
- Changes to this file directly impact the data integrity of the product catalog.
- No external dependencies; maintains data in isolation.
