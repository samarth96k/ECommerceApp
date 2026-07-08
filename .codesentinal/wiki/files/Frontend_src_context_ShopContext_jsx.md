# Purpose
To provide a centralized state management solution for the application's shop-related data and functionality using the React Context API.

# Responsibilities
*   Define and expose `ShopContext` to the component tree.
*   Implement `ShopContextProvider` to encapsulate and distribute shop-specific business logic and state.

# Architectural Role
Application Component acting as a global state provider.

# Critical Review Context
When reviewing PRs affecting this file, prioritize verifying the accuracy of business logic. Ensure that state updates, data transformations, and state-dependent calculations remain consistent with core shop requirements.

# Maintenance Notes
*   Any addition of new global shop state should be integrated here.
*   Ensure that state updates within the provider remain performant to avoid unnecessary re-renders of consuming components.

# Known Constraints
None.

# Related Components
*   Any component requiring access to shop state or methods (consumers of `ShopContext`).

# Repository Memory
This file serves as the primary gateway for shop-related data. Future modifications should be scoped to changes in business rules governing the shopping experience. Standard React Context patterns apply.
