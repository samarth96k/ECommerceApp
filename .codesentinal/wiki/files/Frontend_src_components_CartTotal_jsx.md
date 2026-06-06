# Purpose
Define the `CartTotal` component to display the financial summary of the user's shopping cart.

# Responsibilities
Display the calculated totals (subtotal, shipping fees, and final amount) for items currently held in the shopping cart.

# Architectural Role
Application Component within the frontend user interface.

# Critical Review Context
The component relies on external context for data calculation. Ensure that any changes to pricing logic, currency formatting, or tax/shipping calculations align with the global business logic defined in the `ShopContext`.

# Related Components
- `Frontend/src/components/Title`: Used for rendering section headers.
- `Frontend/src/context/ShopContext`: The source of truth for cart state and calculation logic.

# Repository Memory
- The component is tightly coupled with `ShopContext` to fetch cart data.
- Verify that UI updates in `CartTotal` correctly reflect state changes triggered by user actions elsewhere in the application.
