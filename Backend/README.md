# Jejo Recipe Finder - Backend

The backend API component of a modern, fullstack recipe discovery application built with Laravel 11. This backend provides a robust RESTful API with authentication, database management, and integration with external recipe services.

## 📝 Description

This is the Laravel backend API for Jejo Recipe Finder, a comprehensive fullstack recipe discovery platform. The backend provides secure authentication, recipe management, favorites functionality, and seamless integration with the Vue.js frontend. Built with modern Laravel practices, it features robust API design, database management, and external service integration.

## ✨ Features

### 🔐 Authentication & Security
- **Laravel Sanctum**: Token-based API authentication
- **User Registration & Login**: Secure user management
- **Profile Management**: User profile updates and password changes
- **Route Protection**: Middleware-protected API endpoints
- **Input Validation**: Comprehensive form request validation

### 🍳 Recipe Management
- **Recipe Storage**: Database persistence for recipes from Spoonacular API
- **Favorites System**: User-specific recipe favorites with CRUD operations
- **Search & Filter**: Advanced search and sorting capabilities
- **API Integration**: Seamless integration with Spoonacular API
- **Data Relationships**: Proper database relationships between users, recipes, and favorites

### 🗄️ Database Design
- **Normalized Schema**: Well-structured database with proper relationships
- **Migrations**: Version-controlled database schema management
- **Eloquent ORM**: Powerful object-relational mapping
- **Model Relationships**: Many-to-many relationships for recipes and ingredients
- **Data Integrity**: Foreign key constraints and data validation

### 🚀 API Design
- **RESTful Endpoints**: Standard HTTP methods and status codes
- **API Resources**: Consistent JSON response formatting
- **Error Handling**: Comprehensive error responses with proper HTTP codes
- **Pagination**: Built-in pagination for large datasets
- **CORS Support**: Cross-origin resource sharing for frontend integration

## 🛠️ Technology Stack

- **Framework**: Laravel 11
- **Language**: PHP 8.2+
- **Database**: SQLite (development) / MySQL/PostgreSQL (production)
- **Authentication**: Laravel Sanctum
- **API**: RESTful API with JSON responses
- **Validation**: Laravel Form Requests
- **ORM**: Eloquent ORM
- **External API**: Spoonacular Recipe API integration

## 📁 Project Structure

```
Backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/         # API Controllers
│   │   │   ├── auth/           # Authentication controllers
│   │   │   │   ├── LoginController.php
│   │   │   │   └── RegisterUserController.php
│   │   │   ├── recipe/         # Recipe controllers
│   │   │   │   ├── RecipeController.php
│   │   │   │   └── FavoriteController.php
│   │   │   └── user/           # User controllers
│   │   │       └── ProfileController.php
│   │   ├── Requests/           # Form validation requests
│   │   │   ├── LoginRequest.php
│   │   │   ├── RegisterRequest.php
│   │   │   └── UpdateProfileRequest.php
│   │   └── Resources/          # API response resources
│   │       ├── RecipeResource.php
│   │       ├── IngredientResource.php
│   │       └── UserResource.php
│   ├── Models/                  # Eloquent models
│   │   ├── User.php            # User model
│   │   ├── Recipe.php          # Recipe model
│   │   ├── Favorite.php        # Favorite model
│   │   ├── Ingredient.php      # Ingredient model
│   │   └── DishType.php        # Dish type model
│   ├── Services/                # Business logic services
│   │   ├── AuthService.php     # Authentication service
│   │   └── RecipeService.php   # Recipe service
│   └── Providers/               # Service providers
├── database/
│   ├── migrations/              # Database migrations
│   │   ├── create_users_table.php
│   │   ├── create_recipes_table.php
│   │   ├── create_favorites_table.php
│   │   ├── create_ingredients_table.php
│   │   └── create_dish_types_table.php
│   └── seeders/                 # Database seeders
├── routes/
│   └── api.php                  # API routes
├── composer.json                # Backend dependencies
└── README.md                   # Backend documentation
```

## 🚀 Getting Started

### Prerequisites

- **PHP** (version 8.2 or higher)
- **Composer** (PHP dependency manager)
- **SQLite** (for development) or **MySQL/PostgreSQL** (for production)
- **Vue.js Frontend** (see Frontend README for setup)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Je-Joestar24/jejo_recipe_finder.git
   cd jejo_recipe_finder/Backend
   ```

2. **Install dependencies**

   ```bash
   composer install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure database**

   **For SQLite (Development):**
   ```env
   DB_CONNECTION=sqlite
   DB_DATABASE=/absolute/path/to/database.sqlite
   ```

   **For MySQL/PostgreSQL (Production):**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=jejo_recipe_finder
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. **Set up external API keys**

   ```env
   SPOONACULAR_API_KEY=your_spoonacular_api_key_here
   ```

6. **Run database migrations**

   ```bash
   php artisan migrate
   ```

7. **Start development server**

   ```bash
   php artisan serve
   ```

8. **API Endpoints**

   - API Base URL: `http://localhost:8000/api`
   - Authentication: `POST /api/auth/login`, `POST /api/auth/register`
   - Recipes: `GET /api/recipe`
   - Favorites: `GET /api/favorites`, `POST /api/favorites`

### ⚠️ Important Notes

- **Frontend Integration**: This backend is designed to work with the Vue.js frontend
- **CORS Configuration**: CORS is configured for frontend integration
- **API Authentication**: All protected routes require valid Sanctum tokens
- **Database**: Make sure your database is properly configured before running migrations

## 📦 Available Scripts

```bash
# Development
php artisan serve              # Start Laravel development server
php artisan migrate            # Run database migrations
php artisan migrate:fresh --seed  # Fresh migration with seeders

# Production
php artisan config:cache       # Cache configuration
php artisan route:cache        # Cache routes
php artisan view:cache         # Cache views

# Testing
php artisan test              # Run PHPUnit tests
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout (protected)
- `POST /api/auth/update` - Update user profile (protected)

### Recipes
- `GET /api/recipe` - Fetch recipes with search (protected)

### Favorites
- `GET /api/favorites` - Fetch user favorites with search/sort (protected)
- `POST /api/favorites` - Add recipe to favorites (protected)
- `DELETE /api/favorites` - Remove recipe from favorites (protected)
- `GET /api/favorites/check` - Check if recipe is favorited (protected)

## 🏗️ Architecture Highlights

### Laravel Best Practices
- **Service Layer**: Business logic separated into dedicated services
- **Form Requests**: Input validation with dedicated request classes
- **API Resources**: Consistent JSON response formatting
- **Model Relationships**: Proper Eloquent relationships and eager loading
- **Middleware**: Route protection and authentication

### Database Design
- **Normalized Schema**: Proper database relationships
- **Foreign Keys**: Data integrity with foreign key constraints
- **Indexes**: Optimized database performance
- **Migrations**: Version-controlled schema changes

### Security Features
- **Laravel Sanctum**: Secure API authentication
- **CSRF Protection**: Cross-site request forgery protection
- **Input Validation**: Comprehensive form validation
- **SQL Injection Prevention**: Eloquent ORM protection

## 👨‍💻 Author

**Jejomar Parrilla**

This backend serves as a comprehensive practice exercise in modern Laravel development, demonstrating advanced concepts including API design, authentication, database management, and external service integration.

## 📝 Notes

This is a comprehensive fullstack project created for educational purposes and practice in modern web development. The backend demonstrates advanced Laravel development practices including:

- **Laravel 11** for robust backend API development
- **Laravel Sanctum** for secure API authentication
- **Eloquent ORM** for database operations
- **RESTful API design** with proper HTTP methods
- **Database migrations** for schema management
- **Form validation** with Laravel Form Requests
- **Service layer architecture** for business logic separation
- **API Resources** for consistent response formatting

The project showcases best practices in Laravel development and serves as a reference for building scalable, maintainable backend APIs.
