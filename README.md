# 🚧 JeJo Recipe Finder (Frontend Only)

> **Note:** The backend is **not yet integrated**. This setup only runs the frontend with Spoonacular API for testing and development.

---

## 📦 Installation

```bash
# Clone repository
git clone --branch v1.0.0 https://github.com/Je-Joestar24/jejo_recipe_finder.git

# Install dependencies
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside `frontend/` and add your Spoonacular API key:

```env
VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key_here
```

👉 You may temporarily use this key for practice:
`aec5a74e9bd04399a2ea291627265d92`

---

## 🚀 Development

```bash
npm run dev
```

Runs the development server with hot reload.
App will be available at: [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Production

```bash
npm run build     # Build for production
npm run preview   # Preview the production build
```

---

## 🧪 Testing

```bash
npm run test:unit    # Run unit tests with Vitest
```

---

## ✅ Type Checking

```bash
npm run type-check   # Run TypeScript type checking
```

---

⚠️ **Reminder**: Since the backend is not ready, authentication and data persistence won’t work yet. The app currently relies on **Spoonacular API** only.
