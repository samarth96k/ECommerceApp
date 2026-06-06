# Purpose
Defines the main `App` component, which serves as the root container for the administration interface. It centralizes shared configuration constants including `backendUrl` and `currency`.

# Responsibilities
- Orchestrates the layout of the administration dashboard.
- Maintains and provides global configuration variables to the application.
- Manages high-level application state and routing structure.

# Architectural Role
Application Component: Acts as the primary entry point and layout wrapper for the admin client-side application.

# Critical Review Context
- **Business Logic Correctness:** Changes to `backendUrl` or `currency` impact the entire application. Ensure these constants align with the environment configuration.
- **Routing:** Verify that the integration of page components remains consistent with the navigation structure defined in this file.

# Related Components
- `admin/src/components/Login`
- `admin/src/components/Navbar`
- `admin/src/components/SideBar`
- `admin/src/pages/Add`
- `admin/src/pages/List`
- `admin/src/pages/Orders`

# Repository Memory
- The `App` component is the central hub for administrative functionality.
- Modifications to the layout here reflect globally across the admin interface.
- Keep dependency imports clean and verify that the authentication state logic (interacting with `Login`) remains coupled correctly with the visibility of protected pages.
