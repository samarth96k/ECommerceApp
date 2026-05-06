# Future Scope / Future Work

The following features and improvements can be implemented in future versions of the project to enhance functionality, scalability, and user experience.

## 1. Dynamic Reviews and Ratings System
Currently, product reviews and ratings are hardcoded. In future versions, a fully dynamic review system can be implemented where:
- Users can submit ratings and reviews for purchased products.
- Average product ratings are calculated automatically.
- Reviews are stored and fetched from the database.
- Features like edit/delete review, verified purchase badges, and review sorting can be added.

## 2. User Profile Management
The current profile functionality can be expanded to provide a more personalized user experience. Future improvements may include:
- Dedicated user profile dashboard.
- Displaying user information after clicking on profile.
- Adding editable fields such as:
  - Gender/Sex
  - Date of Birth
  - Phone Number
  - Profile Picture
  - Saved Addresses
- Order history and account settings integration.

## 3. Delivery Partner Portal
A separate delivery partner login system can be introduced similar to the admin login panel. This module can include:
- Secure login for delivery personnel.
- Order assignment and tracking system.
- Live delivery status updates.
- Geo-location based tracking of delivery agents.
- Automatic logging of delivery route and checkpoints.
- Real-time order progress updates for users.

## 4. Real-Time Order Tracking
The order system can be enhanced with:
- Real-time delivery tracking.
- Estimated delivery time prediction.
- Interactive map integration.
- Notifications for dispatch, out-for-delivery, and delivered status.

## 5. AI-Based Recommendations
Machine learning based recommendation systems can be integrated to:
- Recommend products based on user behavior.
- Suggest trending or related products.
- Improve personalization for users.

## 6. UI/UX Enhancements
The user interface of the application can be further improved to provide a more modern and interactive experience. Future upgrades may include:
- Improved responsive design for all screen sizes.
- Better animations and transitions.
- Dark mode support.
- Improved product cards and filtering UI.
- Enhanced dashboard and profile layouts.
- Better loading states and skeleton screens.
- More accessible and user-friendly navigation.

## 7. More Products and Dynamic Categories
Currently, several product categories and subcategories are hardcoded within the application. In future versions, the platform can be expanded by introducing more products and storing all category-related information dynamically in the database.

Future improvements may include:
- Expanding the catalog with a larger variety of products.
- Adding multiple new categories and subcategories.
- Creating separate database models for categories and subcategories.
- Allowing admins to add, edit, or remove categories directly from the admin panel.
- Dynamically fetching categories and filters from the backend instead of hardcoding them in the frontend.
- Making the platform easier to scale and maintain as the number of products grows.

## 8. Parent and Child Account System

A role-based account system can be added where users can have different access levels, such as parent accounts and child accounts. This feature can make the platform more controlled and suitable for family-based shopping.

In this system, child users can browse products, add items to their cart, and fill in required delivery details such as address, contact information, and product preferences. However, they will not be allowed to complete the final order or make any payment.

Future improvements may include:
- Separate roles for parent and child accounts.
- Child accounts linked to a parent account.
- Children can add products to cart and enter delivery details.
- Children cannot place the final order.
- Children cannot use online payment or Cash on Delivery.
- Parent approval required before checkout.
- Parents can review the child’s cart before confirming the order.
- Parents can edit, approve, or reject the order request.
- Role-based access control on both frontend and backend.
- Secure backend validation so restricted actions cannot be bypassed from the frontend.