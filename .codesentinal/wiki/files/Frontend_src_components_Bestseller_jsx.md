# Purpose
The `Bestseller` component is responsible for displaying a collection of top-performing products within the frontend application.

# Responsibilities
- Rendering a curated list of "bestseller" products to the end-user.
- Orchestrating the layout for product displays.

# Architectural Role
Application Component. It functions as a container or section component within the UI hierarchy, aggregating data and sub-components to present a specific view.

# Critical Review Context
When reviewing PRs affecting this component, prioritize the correctness of the business logic. Ensure that the logic governing which products are identified as "bestsellers" is accurate and that the component correctly integrates with the application's global state.

# Related Components
- `ProductItem`: Used for rendering individual product entries within the list.
- `Title`: Used for displaying the section header or branding for the Bestseller area.
- `ShopContext`: Provides the necessary product data and state required to populate the list.

# Repository Memory
- The component relies on `ShopContext` for data retrieval; changes to the context structure will likely necessitate updates here.
- As a presentation component, its visual structure is tightly coupled with `ProductItem` and `Title`. Reviewers should verify that structural changes do not break the layout consistency between these components.
