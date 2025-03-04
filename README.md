# 🛒 E-Commerce API 

A powerful RESTful API for an eCommerce platform, built with Node.js and Express. It supports essential eCommerce functionalities such as product management, user authentication, cart handling, and order processing.

## 🔑 Key Features

- **Full CRUD operations** for products, users, orders, brands, carts, categories, coupons and reviews
- **User authentication** with JWT-based authorization
- **Role-based access control (RBAC)** for admin and customers
- **Cart and checkout management**
- **Order tracking and status updates**
- **Express-validator middleware** for input validation
- **RESTful endpoints** following best practices
- **Error handling middleware** for better API stability
- **Modular and scalable architecture**

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose (or SQL alternatives)
- JWT for authentication
- Express-validator
- REST API principles

## 📁 Project Structure

```
/
├── app.js                    # Main application entry point
├── config/
│   └── database.js           # Database connection setup
├── models/
│   ├── userModel.js          # User model
│   ├── productModel.js       # Product model
│   ├── orderModel.js         # Order model
│   ├── brandModel.js         # Brand model
│   ├── categoryModel.js      # Category model
│   ├── subCategoryModel.js   # Subcategory model
│   ├── reviewModel.js        # Review model
│   ├── couponModel.js        # Coupon model
├── routes/
│   ├── index.js             # Mounts all API routes
│   ├── authRoute.js         # Authentication routes
│   ├── productRoute.js      # Product-related endpoints
│   ├── orderRoute.js        # Order-related endpoints
│   ├── userRoute.js         # User-related endpoints
│   ├── brandRoute.js        # Brand-related endpoints
│   ├── addressRoute.js      # Address-related endpoints
│   ├── cartRoute.js         # Cart-related endpoints
│   ├── categoryRoute.js     # Category-related endpoints
│   ├── subCategoryRoute.js  # Subcategory-related endpoints
│   ├── couponRoute.js       # Coupon-related endpoints
│   ├── reviewRoute.js       # Review-related endpoints
│   ├── wishlistRoute.js     # Wishlist-related endpoints
├── controllers/
│   ├── handlersFactory.js         # CRUD handlers
│   ├── authController.js          # Auth handlers
│   ├── userController.js          # Business logic for users
│   ├── productController.js       # Business logic for products
│   ├── orderController.js         # Business logic for orders
│   ├── brandController.js         # Business logic for brands
│   ├── cartController.js          # Business logic for carts
│   ├── categoryController.js      # Business logic for categories
│   ├── couponController.js        # Business logic for coupons
│   ├── reviewController.js        # Business logic for reviews
│   ├── subCategoryController.js   # Business logic for subcategories
│   ├── wishlistController.js      # Business logic for wishlists
├── middlewares/
│   ├── errorMiddleware.js         # Handling Errors middleware
│   ├── uploadImageMiddleware.js   # Upload Images middleware
│   ├── validatorMiddleware.js     # Express Validator middleware
├── uploads/
│   ├── brands         # Stor Brands Images
│   ├── categories     # Stor Categories Images
│   ├── products       # Stor Products Images
├── utils/
│     ├── validators/
│     ├   ├── authValidator.js            # Validation for auth endpoints
│     ├   ├── productValidator.js         # Validation for products
│     ├   ├── orderValidator.js           # Validation for orders
│     ├   ├── brandValidator.js           # Validation for brands
│     ├   ├── categoryValidator.js        # Validation for categories
│     ├   ├── subCategoryValidator.js     # Validation for subCategories
│     ├   ├── reviewValidator.js          # Validation for reviews
│     ├   ├── userValidator.js            # Validation for users
│     ├   ├── couponValidator.js          # Validation for coupons
│     ├   ├── wishlistValidator.js        # Validation for wishlists
│     ├
│     ├── apiFeatures.js     # Handling filter, sort, limitFields, search and paginate
│     ├── appError.js        # Global error handler
│     ├── generateToken.js   # Generate authentication token using JWT
│     ├── sendEmails.js      # Sending Emails using nodemailer
└── node_modules/
```

## 🌐 API Endpoints

### Authentication

| Method | Endpoint                     | Description                              |
| ------ | -----------------------------| ---------------------------------------- |
| POST   | /api/v1/auth/signup          | User registration                        |
| POST   | /api/v1/auth/login           | User login and token generation          |
| POST   | /api/v1/auth/forgotPassword  | Initiates password reset process         |
| POST   | /api/v1/auth/verifyResetCode | Verifies the password reset code         |
| PATCH  | /api/v1/auth/resetPassword   | Resets the user password                 |

### Products

| Method | Endpoint              | Description                            |
| ------ | --------------------- | ---------------------------------------|
| GET    | /api/v1/products      | Retrieve all products                  |
| GET    | /api/v1/products/:id  | Get single product                     |
| POST   | /api/v1/products      | Add a new product (Admin/Manager only) |
| PUT    | /api/v1/products/:id  | Update product (Admin/Manager only)    |
| DELETE | /api/v1/products/:id  | Delete product (Admin/Manager only)    |

### Brand

| Method | Endpoint              | Description                               |
| ------ | --------------------- | ----------------------------------------- |
| GET    | /api/v1/brands        | Retrieve all brands                       |
| GET    | /api/v1/brands/:id    | Get a single brand by ID                  |
| POST   | /api/v1/brands        | Create a new brand (Admin/Manager only)   |
| PUT    | /api/v1/brands/:id    | Update brand details (Admin/Manager only) |
| DELETE | /api/v1/brands/:id    | Delete a brand (Admin only)               |

### Cart 

| Method | Endpoint                 | Description                             |
| ------ | ------------------------ | --------------------------------------- |
| POST   | /api/v1/cart/            | Add product to cart (User only)         |
| GET    | /api/v1/cart/            | Get logged-in user's cart (User only)   |
| DELETE | /api/v1/cart/            | Clear the cart (User only)              |
| PATCH  | /api/v1/cart/applyCoupon | Apply a coupon to the cart (User only)  | 
| DELETE | /api/v1/cart/:itemId     | Remove a specific cart item (User only) |
| PATCH  | /api/v1/cart/:itemId     | Update cart item quantity (User only)   |

### Categories

| Method | Endpoint                                      | Description                                  |
| ------ | --------------------------------------------- | -------------------------------------------- |
| GET    | /api/v1/categories                            | Retrieve all categories                      |
| POST   | /api/v1/categories                            | Create a new category (Admin/Manager only)   |
| GET    | /api/v1/categories/:id                        | Get a single category by ID                  |
| PATCH  | /api/v1/categories/:id                        | Update category details (Admin/Manager only) |
| DELETE | /api/v1/categories/:id                        | Delete a category (Admin only)               |
| GET    | /api/v1/categories/:categoryId/subcategories  | Delete a category (Admin only)               |

### SubCategories

| Method | Endpoint                         | Description                                     |
| ------ | ---------------------------------| ----------------------------------------------- |
| GET    | /api/v1/subCategories            | Retrieve all subcategories                      |
| POST   | /api/v1/subCategories            | Create a new subcategory (Admin/Manager only)   |
| GET    | /api/v1/subCategories/:id        | Get a single subcategory by ID                  |
| PATCH  | /api/v1/subCategories/:id        | Update subcategory details (Admin/Manager only) |
| DELETE | /api/v1/subCategories/:id        | Delete a subcategory (Admin only)               |

### Coupons 

| Method | Endpoint                 | Description                                    |
| ------ | ------------------------ | ---------------------------------------------- |
| GET    | /api/v1/coupons          | Retrieve all coupons (Admin/Manager only)      |
| POST   | /api/v1/coupons          | Create a new coupon (Admin/Manager only)       |
| GET    | /api/v1/coupons/:id      | Get a single coupon by ID (Admin/Manager only) |
| PATCH  | /api/v1/coupons/:id      | Update coupon details (Admin/Manager only)     | 
| DELETE | /api/v1/coupons/:id      | Delete a coupon (Admin/Manager only)           |

### Reviews

| Method | Endpoint                 | Description                          |
| ------ | ------------------------ | ------------------------------------ |
| GET    | /api/v1/reviews          | Retrieve all reviews                 |
| POST   | /api/v1/reviews          | Create a new review (User only)      |
| GET    | /api/v1/reviews/:id      | Get a single review by ID            |
| PATCH  | /api/v1/reviews/:id      | Update a review (User only)          | 
| DELETE | /api/v1/reviews/:id      | Delete a review (Admin/Manager/User) |

### Users

| Method | Endpoint                         | Description                          |
| ------ | -------------------------------- | ------------------------------------ |
| GET    | /api/v1/users/getMe              | Retrieve logged-in user data         |
| PATCH  | /api/v1/users/changeMyPassword   | Update logged-in user password       |
| PATCH  | /api/v1/users/updateMe           | Update logged-in user data           |
| DELETE | /api/v1/users/deleteMe           | Delete logged-in user account        | 
| GET    | /api/v1/users                    | Retrieve all users (Admin/Manager)   |
| POST   | /api/v1/users                    | Create a new user (Admin/Manager)    |
| GET    | /api/v1/users/:id                | Retrieve a single user by ID         |
| PATCH  | /api/v1/users/:id                | Update user data (Admin/Manager)     |
| DELETE | /api/v1/users/:id                | Delete user (Admin/Manager)          |
| PATCH  | /api/v1/users/changePassword/:id | Change user password (Admin/Manager) |

### Wishlists

| Method | Endpoint                    | Description                           |
| ------ | ----------------------------| ------------------------------------- |
| POST   | /api/v1/wishlist            | Add a product to wishlist (User only) |
| GET    | /api/v1/wishlist            | Get logged-in user's wishlist         |
| DELETE | /api/v1/wishlist/:productId | Remove a product from wishlist (User) |

## ✅ Best Practices

- Secure authentication with JWT and password hashing
- Strict input validation using express-validator
- Role-based access control for admin and users
- Modular architecture for scalability
- Centralized error handling middleware
- Well-documented RESTful endpoints

---

**Developed as a robust foundation for eCommerce API development with Node.js and Express.**

