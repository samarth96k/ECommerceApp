# Purpose
To manage global state for the shopping cart and product catalog, specifically providing functions to calculate total cart values and maintain shared application state.

# Responsibilities
- Define and provide the `ShopContext` to the application tree.
- Implement the `ShopContextProvider` component to wrap the application and expose shared data and helper functions.
- Centralize logic for cart amount calculations via `getCartAmount`.

# Architectural Role
Application Component serving as a primary state management provider within the frontend architecture.

# Critical Review Context
- Focus on business logic correctness within `getCartAmount`.
- Ensure that the state exposure within `ShopContextProvider` correctly propagates data to consuming components.
- Verify that the calculation logic accurately reflects the intended pricing rules.

# Related Components
- Frontend components that consume `ShopContext` to display cart totals or manage item quantities.

# Repository Memory
- The `ShopContext.jsx` file is the central source of truth for cart operations.
- Modifications to `getCartAmount` directly impact checkout values and UI representations of the cart total.
- Maintain consistency between product data structures and the logic implemented in the context provider.
