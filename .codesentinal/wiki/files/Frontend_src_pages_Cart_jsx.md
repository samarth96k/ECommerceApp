# Purpose
Defines the `Cart` page component, serving as the central view for users to manage and review selected items before checkout.

# Responsibilities
- Rendering the user interface for the shopping cart.
- Orchestrating the display of cart items through integration with the shop context.
- Presenting total pricing information and page headers.

# Architectural Role
Application Component (Page-level).

# Critical Review Context
When reviewing PRs affecting this file, focus strictly on business logic correctness, specifically how cart state updates are reflected and how data from the `ShopContext` is consumed and transformed for display.

# Maintenance Notes
Ensure any changes to the cart data structure in `ShopContext` are synchronized with this component. Changes to the display logic should maintain consistency with the layout established by `Title` and `CartTotal`.

# Known Constraints
None.

# Related Components
- `Frontend/src/components/CartTotal`
- `Frontend/src/components/Title`
- `Frontend/src/context/ShopContext`

# Repository Memory
The `Cart` page acts as a primary consumer of the application's global shop state. It is positioned as the top-level container for cart-related operations and relies on specialized sub-components for standardized formatting of totals and headers. Reviews should verify that logic remains contained and that context updates do not introduce side effects in the rendering flow.
