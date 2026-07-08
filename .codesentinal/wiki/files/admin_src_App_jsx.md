# Purpose
Defines the main `App` component, centralizing global configuration including the `backendUrl` and `currency` settings for the admin panel.

# Responsibilities
- Serve as the root entry point for the admin application.
- Manage global state variables required across various admin modules.
- Handle component routing and layout structure.

# Architectural Role
Application Component (Root level).

# Critical Review Context
- Prioritize business logic correctness regarding global configuration.
- Ensure `backendUrl` and `currency` are correctly propagated to child components.

# Maintenance Notes
- Any modifications to the application's base URL or global currency settings must be managed here.
- Updates to the top-level layout or routing structure impact all child pages.

# Known Constraints
None.

# Related Components
- `admin/src/components/Login`
- `admin/src/components/Navbar`
- `admin/src/components/SideBar`
- `admin/src/pages/Add`
- `admin/src/pages/Dashboard`
- `admin/src/pages/List`
- `admin/src/pages/Orders`

# Repository Memory
This file serves as the integration point for all admin interface sub-components. Changes here are global and affect the entire admin dashboard's connectivity and display logic.
