# Purpose
The purpose of this file is to establish the database connection layer for the application by defining the `connectDB` function.

# Responsibilities
*   Implementing the connection logic for the MongoDB database.
*   Integrating application configuration with the database driver.

# Architectural Role
This is an Application Component responsible for the infrastructure-level task of database initialization.

# Critical Review Context
The implementation relies on environment variables for configuration. When reviewing changes to this file, ensure that there is robust handling for missing or malformed secrets to prevent application failure or insecure default states.

# Related Components
*   `Backend/config` (Parent directory containing configuration utilities)

# Repository Memory
*   **Initialization Flow:** This file is the primary entry point for database connectivity.
*   **Security Note:** Verify that any updates to the connection string logic do not expose sensitive credentials in logs or non-secure output.
*   **Dependency Status:** Currently has no external dependencies beyond the MongoDB driver; ensure any new dependencies added are evaluated for security and performance impact.
