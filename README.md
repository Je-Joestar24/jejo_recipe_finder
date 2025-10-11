# Jejo Recipe Finder

A modern, fullstack recipe discovery application built with Vue 3, TypeScript, Pinia, and Laravel. This project demonstrates advanced fullstack development practices including state management, route guards, modular components, RESTful API integration, authentication, and database management.

## 📝 Description

Jejo Recipe Finder is a comprehensive fullstack recipe discovery platform that allows users to search for recipes, save their favorites, and manage their culinary journey. Built with modern web technologies, it features a clean, intuitive interface with robust state management, secure authentication, and seamless user experience across both frontend and backend systems.

## ✨ Features

### 🔍 Recipe Discovery

- **Smart Search**: Find recipes by ingredients, dietary needs, or cravings
- **API Integration**: Powered by Spoonacular API for extensive recipe database
- **Real-time Results**: Instant search results with loading states
- **Recipe Details**: Comprehensive recipe information including ingredients, instructions, and cooking times

### 💾 Recipe Management

- **Save Favorites**: One-click recipe saving to personal collection with database persistence
- **User-specific Storage**: Each user has their own saved recipes stored securely in the database
- **Search & Filter**: Find saved recipes quickly with search and sort functionality
- **Recipe Modals**: Detailed recipe view with full instructions and ingredients
- **Database Integration**: Full CRUD operations with Laravel backend

### 👤 User Authentication

- **Secure Login/Signup**: User registration and authentication system with Laravel Sanctum
- **Profile Management**: Edit profile information and change passwords with backend validation
- **Session Persistence**: Maintains login state across browser sessions with secure tokens
- **Route Protection**: Automatic redirects based on authentication status
- **API Security**: Protected routes with middleware and token-based authentication

### 🎨 Modern UI/UX

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Smooth Animations**: CSS animations and transitions for enhanced UX
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation

### 🏗️ Technical Excellence

- **Modular Architecture**: Reusable components with clear separation of concerns
- **State Management**: Centralized state with Pinia stores
- **Route Guards**: Protected routes with authentication checks
- **Type Safety**: Full TypeScript implementation for better development experience
- **RESTful API**: Well-structured Laravel API with proper HTTP methods and status codes
- **Database Design**: Normalized database schema with proper relationships
- **Security**: CSRF protection, input validation, and secure authentication

## 🛠️ Technology Stack

### Frontend
- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **State Management**: Pinia
- **Routing**: Vue Router 4 with route guards
- **Build Tool**: Vite
- **Styling**: CSS with CSS Grid and Flexbox
- **HTTP Client**: Axios for API requests
- **Storage**: localStorage and sessionStorage for data persistence

### Backend
- **Framework**: Laravel 11
- **Language**: PHP 8.2+
- **Database**: SQLite (development) / MySQL/PostgreSQL (production)
- **Authentication**: Laravel Sanctum for API authentication
- **API**: RESTful API with proper HTTP methods and status codes
- **Validation**: Laravel Form Requests for input validation
- **ORM**: Eloquent ORM for database operations
- **Migrations**: Database schema management with Laravel migrations

## 📁 Project Structure

```
jejo_recipe_finder/
├── Frontend/                        # Vue.js Frontend Application
│   ├── public/                      # Static assets
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/                  # Application assets
│   │   │   ├── css/                 # Stylesheets
│   │   │   │   ├── base.css        # Global styles and CSS variables
│   │   │   │   ├── home/           # Home page styles
│   │   │   │   ├── nav/            # Navigation styles
│   │   │   │   ├── footer/         # Footer styles
│   │   │   │   ├── modals/         # Modal component styles
│   │   │   │   ├── search/         # Search page styles
│   │   │   │   ├── saved/          # Saved recipes styles
│   │   │   │   ├── profile/        # Profile page styles
│   │   │   │   └── message/        # Notification styles
│   │   │   ├── logo.svg            # Application logo
│   │   │   └── main.css            # Main stylesheet
│   │   ├── components/              # Reusable Vue components
│   │   │   ├── about/               # About page components
│   │   │   ├── footer/              # Footer components
│   │   │   ├── home/                # Home page components
│   │   │   ├── icons/               # Icon components
│   │   │   ├── modal/               # Modal components
│   │   │   │   ├── login/          # Login modal
│   │   │   │   ├── signup/         # Signup modal
│   │   │   │   └── recipe/         # Recipe detail modal
│   │   │   ├── navs/                # Navigation components
│   │   │   ├── notifications/       # Notification components
│   │   │   ├── profile/             # Profile page components
│   │   │   ├── savedRecipe/         # Saved recipes components
│   │   │   └── searchRecipe/        # Search page components
│   │   ├── router/                  # Vue Router configuration
│   │   │   ├── index.ts            # Router setup with guards
│   │   │   └── routes.ts           # Route definitions
│   │   ├── services/                # API service layer
│   │   │   ├── auth/               # Authentication services
│   │   │   ├── favorites/          # Favorites API services
│   │   │   └── recipe/             # Recipe API services
│   │   ├── stores/                  # Pinia state management
│   │   │   ├── home.ts             # Home page data store
│   │   │   ├── modals.ts           # Modal state management
│   │   │   ├── notifications.ts    # Notification system
│   │   │   ├── profile.ts          # Profile management store
│   │   │   ├── recipe.ts           # Recipe data and API store
│   │   │   ├── types.ts            # TypeScript type definitions
│   │   │   └── user.ts             # User authentication store
│   │   ├── types/                   # TypeScript type definitions
│   │   ├── views/                   # Page components
│   │   │   ├── AboutView.vue       # About page
│   │   │   ├── HomeView.vue        # Home landing page
│   │   │   ├── ProfileView.vue     # User profile page
│   │   │   ├── SavedRecipeView.vue # Saved recipes page
│   │   │   └── SearchRecipeView.vue # Recipe search page
│   │   ├── App.vue                 # Root application component
│   │   └── main.ts                 # Application entry point
│   ├── package.json                 # Frontend dependencies and scripts
│   ├── tsconfig.json                # TypeScript configuration
│   ├── vite.config.ts               # Vite build configuration
│   └── README.md                   # Frontend documentation
├── Backend/                         # Laravel Backend API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/         # API Controllers
│   │   │   │   ├── auth/           # Authentication controllers
│   │   │   │   ├── recipe/         # Recipe controllers
│   │   │   │   └── user/           # User controllers
│   │   │   ├── Requests/           # Form validation requests
│   │   │   └── Resources/          # API response resources
│   │   ├── Models/                  # Eloquent models
│   │   │   ├── User.php            # User model
│   │   │   ├── Recipe.php          # Recipe model
│   │   │   ├── Favorite.php        # Favorite model
│   │   │   ├── Ingredient.php      # Ingredient model
│   │   │   └── DishType.php        # Dish type model
│   │   ├── Services/                # Business logic services
│   │   │   ├── AuthService.php     # Authentication service
│   │   │   └── RecipeService.php   # Recipe service
│   │   └── Providers/               # Service providers
│   ├── database/
│   │   ├── migrations/              # Database migrations
│   │   └── seeders/                 # Database seeders
│   ├── routes/
│   │   └── api.php                  # API routes
│   ├── composer.json                # Backend dependencies
│   └── README.md                   # Backend documentation
└── README.md                       # Main project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **PHP** (version 8.2 or higher)
- **Composer** (PHP dependency manager)
- **npm or yarn** package manager
- **SQLite** (for development) or **MySQL/PostgreSQL** (for production)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Je-Joestar24/jejo_recipe_finder.git
   cd jejo_recipe_finder
   ```

2. **Backend Setup (Laravel)**

   ```bash
   cd Backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan serve
   ```

3. **Frontend Setup (Vue.js)**

   ```bash
   cd Frontend
   npm install
   ```

4. **Set up environment variables**

   **Backend (.env in Backend directory):**
   ```env
   APP_NAME="Jejo Recipe Finder"
   APP_ENV=local
   APP_KEY=base64:your_generated_key
   APP_DEBUG=true
   APP_URL=http://localhost:8000
   
   DB_CONNECTION=sqlite
   DB_DATABASE=/absolute/path/to/database.sqlite
   
   SPOONACULAR_API_KEY=your_spoonacular_api_key_here
   ```

   **Frontend (.env in Frontend directory):**
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key_here
   ```

5. **Start development servers**

   **Backend (Terminal 1):**
   ```bash
   cd Backend
   php artisan serve
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd Frontend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000/api`

## 📦 Available Scripts

### Frontend Scripts
```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test:unit    # Run unit tests with Vitest

# Type checking
npm run type-check   # TypeScript type checking
```

### Backend Scripts
```bash
# Development
php artisan serve    # Start Laravel development server
php artisan migrate  # Run database migrations
php artisan migrate:fresh --seed  # Fresh migration with seeders

# Production
php artisan config:cache    # Cache configuration
php artisan route:cache     # Cache routes
php artisan view:cache      # Cache views

# Testing
php artisan test     # Run PHPUnit tests
```

## 🏗️ Architecture Highlights

### State Management with Pinia

- **Centralized Stores**: Separate stores for different concerns (user, recipes, modals, etc.)
- **Reactive State**: Real-time state updates across components
- **Type Safety**: Full TypeScript support for store state and actions
- **Persistence**: Automatic localStorage/sessionStorage integration

### Route Guards & Authentication

- **Protected Routes**: Automatic redirects for unauthenticated users
- **Guest Routes**: Landing pages for non-authenticated users
- **Navigation Notifications**: User feedback for route changes
- **Session Management**: Persistent login state

### Modular Component Architecture

- **Reusable Components**: Well-structured, reusable Vue components
- **Props & Events**: Clean component communication
- **Composition API**: Modern Vue 3 patterns for better code organization
- **Type Safety**: Full TypeScript integration for components

### API Integration

- **Spoonacular API**: Comprehensive recipe database integration
- **Laravel API**: RESTful backend API with authentication
- **Error Handling**: Robust error handling for API failures
- **Loading States**: User feedback during API operations
- **Caching**: Efficient data management and storage
- **Authentication**: Secure token-based authentication with Laravel Sanctum

## 🎯 Key Features Implementation

### Recipe Search & Discovery

- Real-time search with API integration
- Recipe filtering and sorting
- Detailed recipe information display
- Save/unsave functionality

### User Authentication System

- Secure login/signup with validation
- Profile management with password changes
- Session persistence across browser sessions
- Automatic route protection

### Responsive Design

- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Dark/light mode support
- Smooth animations and transitions

## 👨‍💻 Author

**Jejomar Parrilla**

This project serves as a comprehensive practice exercise in modern Vue.js development, demonstrating advanced concepts including state management, route guards, modular architecture, and API integration.

## 📝 Notes

This is a comprehensive fullstack project created for educational purposes and practice in modern web development. It demonstrates advanced fullstack development practices including:

### Frontend Technologies
- **Vue 3 Composition API** for reactive state management
- **Pinia stores** for centralized state management
- **Vue Router** with route guards for navigation
- **Modular component architecture** for reusability
- **TypeScript** for type safety and better development experience
- **Responsive design** with modern CSS techniques

### Backend Technologies
- **Laravel 11** for robust backend API development
- **Laravel Sanctum** for secure API authentication
- **Eloquent ORM** for database operations
- **RESTful API design** with proper HTTP methods
- **Database migrations** for schema management
- **Form validation** with Laravel Form Requests

### Fullstack Integration
- **API integration** with external services (Spoonacular)
- **Secure authentication** flow between frontend and backend
- **Database persistence** for user data and favorites
- **Error handling** across the entire application stack
- **Type safety** from frontend to backend

The project showcases best practices in fullstack development and serves as a reference for building scalable, maintainable web applications with modern technologies.
