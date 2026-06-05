# Purpose
Serves as the root entry point for the `admin` application. It defines global configurations, including the backend endpoint URL and currency settings, while managing the top-level component tree.

# Responsibilities
*   Acts as the central orchestrator for the admin dashboard interface.
*   Provides global application constants (`backendUrl`, `currency`) used across child modules.
*   Manages the integration and layout of core UI components and page views.

# Architectural Role
Application Component. It functions as the shell that bootstraps the admin dashboard, coordinating navigation, authentication states, and feature-specific pages.

# Critical Review Context
The logic within this file is central to the application's connectivity and display consistency. When reviewing PRs, verify that updates to global constants do not break downstream dependencies and that routing logic maintains the integrity of the dashboard structure.

# Related Components
*   **Navigation & Layout:** `Login`, `Navbar`, `SideBar`
*   **Functional Pages:** `Add`, `List`, `Orders`

# Repository Memory
The `App.jsx` file is the primary configuration hub for the admin interface. Any changes to the `backendUrl` or `currency` definitions require careful consideration, as these values are consumed globally across all administrative modules. Changes to component composition here directly impact the dashboard's layout and accessibility.
