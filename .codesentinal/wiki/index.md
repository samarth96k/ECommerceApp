# CodeSentinal Wiki

Welcome to the CodeSentinal documentation. This wiki provides a structured overview of the project's architecture, source code, and configuration files.

## Repository Statistics
- **Total Files:** 78
- **Source Files:** 62
- **Workflow Files:** 1
- **Config Files:** 3
- **Test Files:** 1

## Tech Stack
- **CI/CD:** GitHub Actions

---

## Documentation Index

### Configuration & Workflows
- [.github/workflows/SAMEREPOPR.yml](files/_github_workflows_SAMEREPOPR_yml.md)
- [docker-compose.yml](files/docker-compose_yml.md)

### Backend Services
- **Configuration:**
    - [Backend/config/cloudinary.js](files/Backend_config_cloudinary_js.md)
    - [Backend/config/gemini.js](files/Backend_config_gemini_js.md)
    - [Backend/config/mongodb.js](files/Backend_config_mongodb_js.md)
    - [Backend/config/redis.js](files/Backend_config_redis_js.md)
    - [Backend/vercel.json](files/Backend_vercel_json.md)
- **Controllers:**
    - [adminController](files/Backend_controllers_adminController_js.md) | [cartController](files/Backend_controllers_cartController_js.md) | [orderController](files/Backend_controllers_orderController_js.md) | [productController](files/Backend_controllers_productController_js.md) | [userController](files/Backend_controllers_userController_js.md)
- **Middleware:**
    - [admin_auth](files/Backend_middleware_admin_auth_js.md) | [auth](files/Backend_middleware_auth_js.md) | [multer](files/Backend_middleware_multer_js.md) | [profileAuth](files/Backend_middleware_profileAuth_js.md) | [rateLimiter](files/Backend_middleware_rateLimiter_js.md)
- **Models:**
    - [orderModel](files/Backend_models_orderModel_js.md) | [productModel](files/Backend_models_productModel_js.md) | [userModel](files/Backend_models_userModel_js.md)
- **Routes & Services:**
    - [Routes](files/Backend_routes_cartRoutes_js.md) | [server.js](files/Backend_server_js.md) | [Services](files/Backend_services_cartServices_js.md) | [Utils/Logger](files/Backend_utils_logger_js.md)

### Frontend (Client)
- **Core:** [App.jsx](files/Frontend_src_App_jsx.md) | [main.jsx](files/Frontend_src_main_jsx.md) | [ShopContext](files/Frontend_src_context_ShopContext_jsx.md)
- **Components:** [Bestseller](files/Frontend_src_components_Bestseller_jsx.md) | [CartTotal](files/Frontend_src_components_CartTotal_jsx.md) | [Navbar](files/Frontend_src_components_Navbar_jsx.md) | [ProductItem](files/Frontend_src_components_ProductItem_jsx.md) | *[...view all components](files/Frontend_src_components_Footer_jsx.md)*
- **Pages:** [About](files/Frontend_src_pages_About_jsx.md) | [Cart](files/Frontend_src_pages_Cart.jsx.md) | [Collection](files/Frontend_src_pages_Collection_jsx.md) | [Home](files/Frontend_src_pages_Home_jsx.md) | [Orders](files/Frontend_src_pages_Orders_jsx.md) | [Product](files/Frontend_src_pages_Product_jsx.md)

### Admin Panel
- [App](files/admin_src_App_jsx.md) | [Dashboard](files/admin_src_pages_Dashboard_jsx.md) | [List](files/admin_src_pages_List_jsx.md) | [Orders](files/admin_src_pages_Orders_jsx.md) | [Add Product](files/admin_src_pages_Add_jsx.md)

### Project Documentation
- [Frontend README](files/Frontend_README_md.md)
- [Admin README](files/admin_README_md.md)
- [Future Works](files/FutureWoks_md.md)
