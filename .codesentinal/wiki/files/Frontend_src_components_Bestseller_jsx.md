# Purpose
To define and render the `Bestseller` component, which displays a curated list of top-performing products within the frontend application.

# Responsibilities
- Retrieves product data via context.
- Orchestrates the rendering of section headings and product lists.
- Manages the display of top-selling items to the user.

# Architectural Role
Application Component. This component acts as a functional UI container that bridges business data (from the shop context) with visual presentation layers.

# Critical Review Context
Reviews should prioritize the accuracy of the business logic governing which products are classified as "bestsellers." Ensure that data filtering logic remains consistent with the source provided by the context provider.

# Related Components
- `ProductItem`: Used for rendering individual product entries.
- `Title`: Used for displaying the section header.
- `ShopContext`: The primary data source for product information.

# Repository Memory
- The component relies on `ShopContext` for state management; any structural changes to the product data schema in the context will necessitate updates here.
- As a primary display component, ensure that the integration with `ProductItem` handles edge cases where product lists might be empty.
