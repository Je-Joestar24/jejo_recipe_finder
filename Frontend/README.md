# Jejo Recipe Finder - Frontend

The frontend component of a modern, fullstack recipe discovery application built with Vue 3, TypeScript, and Pinia. This frontend demonstrates advanced Vue.js development practices including state management, route guards, modular components, and API integration with a Laravel backend.

## 📝 Description

This is the frontend application for Jejo Recipe Finder, a comprehensive fullstack recipe discovery platform. The frontend provides a clean, intuitive interface that communicates with a Laravel backend API to allow users to search for recipes, save their favorites, and manage their culinary journey. Built with modern web technologies, it features robust state management and seamless user experience.

## ✨ Features

### 🔍 Recipe Discovery

- **Smart Search**: Find recipes by ingredients, dietary needs, or cravings
- **API Integration**: Powered by Spoonacular API for extensive recipe database
- **Real-time Results**: Instant search results with loading states
- **Recipe Details**: Comprehensive recipe information including ingredients, instructions, and cooking times

### 💾 Recipe Management

- **Save Favorites**: One-click recipe saving to personal collection via Laravel API
- **User-specific Storage**: Each user has their own saved recipes stored in the backend database
- **Search & Filter**: Find saved recipes quickly with search and sort functionality
- **Recipe Modals**: Detailed recipe view with full instructions and ingredients
- **API Integration**: Full CRUD operations with Laravel backend for favorites management

### 👤 User Authentication

- **Secure Login/Signup**: User registration and authentication system with Laravel Sanctum
- **Profile Management**: Edit profile information and change passwords via backend API
- **Session Persistence**: Maintains login state across browser sessions with secure tokens
- **Route Protection**: Automatic redirects based on authentication status
- **API Security**: Protected API calls with authentication headers

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
- **API Services**: Organized service layer for backend communication
- **Error Handling**: Comprehensive error handling for API failures
- **Loading States**: User feedback during API operations

## 🛠️ Technology Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **State Management**: Pinia
- **Routing**: Vue Router 4 with route guards
- **Build Tool**: Vite
- **Styling**: CSS with CSS Grid and Flexbox
- **HTTP Client**: Axios for API requests
- **API Integration**: Laravel backend API with authentication
- **Storage**: localStorage and sessionStorage for data persistence
- **Authentication**: Laravel Sanctum token-based authentication

## 📁 Project Structure

```
Frontend/
├── public/                          # Static assets
│   └── favicon.ico
├── src/
│   ├── assets/                      # Application assets
│   │   ├── css/                     # Stylesheets
│   │   │   ├── base.css            # Global styles and CSS variables
│   │   │   ├── home/               # Home page styles
│   │   │   ├── nav/                # Navigation styles
│   │   │   ├── footer/             # Footer styles
│   │   │   ├── modals/             # Modal component styles
│   │   │   ├── search/             # Search page styles
│   │   │   ├── saved/              # Saved recipes styles
│   │   │   ├── profile/            # Profile page styles
│   │   │   └── message/            # Notification styles
│   │   ├── logo.svg                # Application logo
│   │   └── main.css                # Main stylesheet
│   ├── components/                  # Reusable Vue components
│   │   ├── about/                   # About page components
│   │   ├── footer/                  # Footer components
│   │   ├── home/                    # Home page components
│   │   ├── icons/                   # Icon components
│   │   ├── modal/                   # Modal components
│   │   │   ├── login/              # Login modal
│   │   │   ├── signup/             # Signup modal
│   │   │   └── recipe/             # Recipe detail modal
│   │   ├── navs/                    # Navigation components
│   │   ├── notifications/           # Notification components
│   │   ├── profile/                 # Profile page components
│   │   ├── savedRecipe/             # Saved recipes components
│   │   └── searchRecipe/            # Search page components
│   ├── router/                      # Vue Router configuration
│   │   ├── index.ts                # Router setup with guards
│   │   └── routes.ts               # Route definitions
│   ├── services/                    # API service layer
│   │   ├── auth/                   # Authentication services
│   │   │   ├── login.ts            # Login service
│   │   │   └── logout.ts           # Logout service
│   │   ├── favorites/              # Favorites API services
│   │   │   ├── checkFavorites.ts   # Check favorite status
│   │   │   ├── deleteFavorite.ts   # Remove from favorites
│   │   │   ├── fetchFavorites.ts   # Fetch user favorites
│   │   │   └── storeFavorite.ts    # Add to favorites
│   │   └── recipe/                 # Recipe API services
│   │       └── fetchRecipes.ts     # Fetch recipes from API
│   ├── stores/                      # Pinia state management
│   │   ├── home.ts                 # Home page data store
│   │   ├── modals.ts               # Modal state management
│   │   ├── notifications.ts        # Notification system
│   │   ├── profile.ts              # Profile management store
│   │   ├── recipe.ts               # Recipe data and API store
│   │   ├── types.ts                # TypeScript type definitions
│   │   └── user.ts                 # User authentication store
│   ├── types/                       # TypeScript type definitions
│   │   └── auth.ts                 # Authentication types
│   ├── views/                       # Page components
│   │   ├── AboutView.vue           # About page
│   │   ├── HomeView.vue            # Home landing page
│   │   ├── ProfileView.vue         # User profile page
│   │   ├── SavedRecipeView.vue     # Saved recipes page
│   │   └── SearchRecipeView.vue    # Recipe search page
│   ├── App.vue                     # Root application component
│   └── main.ts                     # Application entry point
├── package.json                     # Frontend dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite build configuration
└── README.md                       # Frontend documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm or yarn** package manager
- **Laravel Backend** running on `http://localhost:8000` (see Backend README for setup)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Je-Joestar24/jejo_recipe_finder.git
   cd jejo_recipe_finder/Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the Frontend directory:

   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key_here
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### ⚠️ Important Notes

- **Backend Required**: This frontend requires the Laravel backend to be running for full functionality
- **API Endpoints**: Make sure the backend API is accessible at the URL specified in `VITE_API_BASE_URL`
- **Authentication**: User authentication and favorites features require backend connectivity

## 📦 Available Scripts

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
- **Error Handling**: Robust error handling for API failures
- **Loading States**: User feedback during API operations
- **Caching**: Efficient data management and storage

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

This is a mock project created for educational purposes and practice in Vue.js development. It demonstrates modern web development practices including:

- **Vue 3 Composition API** for reactive state management
- **Pinia stores** for centralized state management
- **Vue Router** with route guards for navigation
- **Modular component architecture** for reusability
- **TypeScript** for type safety and better development experience
- **Responsive design** with modern CSS techniques
- **API integration** with external services

The project showcases best practices in Vue.js development and serves as a reference for building scalable, maintainable web applications.
