# Purpose
The `CartTotal` component is responsible for calculating and displaying the summary of financial data related to the user's shopping cart.

# Responsibilities
- Aggregates cart items and their associated pricing information.
- Renders the final monetary breakdown (subtotals, delivery fees, and grand totals) for the user.

# Architectural Role
Application Component within the frontend presentation layer.

# Critical Review Context
When reviewing PRs affecting this component, prioritize the accuracy of business logic regarding price calculations, currency formatting, and conditional fee application (e.g., delivery charges).

# Maintenance Notes
- Logic for cart calculations is dependent on shared state managed within the `ShopContext`.
- Ensure any changes to tax or shipping logic are synchronized with the global state provider.

# Known Constraints
- UI structure is rigid to maintain consistency with the application's checkout design.
- Relies on external context data structures; schema changes in `ShopContext` will necessitate updates here.

# Related Components
- `Frontend/src/components/Title`: Used for section labeling.
- `Frontend/src/context/ShopContext`: Provides the cart data and pricing calculations.

# Repository Memory
- Initialized as a core component for displaying checkout summaries.
- Changes to calculation logic must be validated against the data provided by `ShopContext` to prevent display regressions during checkout.
