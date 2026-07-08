# Purpose
To serve as the centralized registry for static assets (images and icons) used throughout the admin application.

# Responsibilities
- Managing and exposing references to internal asset files, including logos, icons, and UI interface graphics.
- Ensuring consistent asset availability for components within the admin module.

# Architectural Role
Application Component (Asset Registry)

# Critical Review Context
- Focus on business logic correctness regarding asset mapping.
- Ensure that any updates to the asset registry correctly map to the existing file paths.

# Maintenance Notes
- When adding or removing assets, ensure the corresponding file exists in the directory before updating the registry.
- Verify that image formats (PNG/SVG) are appropriate for their intended UI usage.

# Known Constraints
- Limited to assets contained within the `admin/src/assets/` directory.

# Related Components
- `admin/src/assets/add_icon.png`
- `admin/src/assets/logo.png`
- `admin/src/assets/order_icon.png`
- `admin/src/assets/parcel_icon.svg`
- `admin/src/assets/upload_area.png`

# Repository Memory
This file acts as the single source of truth for administrative UI assets. Changes to asset filenames or directory structures require updating this registry to prevent broken UI elements.
