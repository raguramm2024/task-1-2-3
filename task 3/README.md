# task3 — Authentication & Authorization Module

This folder contains a complete standalone authentication module for the existing project. It includes a dedicated backend auth server and a React auth frontend that integrate with the existing `task1` APIs and `task2` frontend app.

## Contents

- `backend-auth/` — Node.js + Express auth service with JWT, cookies, password hashing, protected middleware, and centralized error handling.
- `frontend-auth/` — React auth UI with login, register, dashboard, protected routes, and context-based auth state.
- `.env.example` — root example for task3 settings.

## Getting Started

### 1. Backend Auth Setup

```bash
cd "task 3/backend-auth"
npm install
```

Copy `.env.example` to `.env` and configure:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/auth-demo
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3001
```

Start the backend auth server:

```bash
npm run dev
```

### 2. Frontend Auth Setup

```bash
cd "task 3/frontend-auth"
npm install
npm start
```

The frontend app is configured to call the auth API at `http://localhost:5001/api`.

## How Auth Works

- Registration and login create a JWT token signed with `JWT_SECRET`.
- The token is stored in an `httpOnly` cookie named `token`.
- `GET /api/auth/me` validates the cookie and returns the authenticated user.
- Protected backend routes use `protect` middleware to verify JWTs.
- The frontend uses `AuthContext` to persist user state and route protection.

## Backend Auth Highlights

- `backend-auth/server.js` sets up Express, CORS, logger, JSON parsing, and routes.
- `backend-auth/models/User.js` hashes passwords before save and validates minimum length.
- `backend-auth/controllers/authController.js` handles register, login, logout, and profile lookup.
- `backend-auth/middleware/authMiddleware.js` verifies cookie JWTs and protects routes.
- `backend-auth/middleware/errorMiddleware.js` captures validation, duplicate email, and token errors.
- Requests are logged by `backend-auth/middleware/logger.js`.

## Frontend Auth Highlights

- `frontend-auth/src/context/AuthContext.js` manages auth state, loading, and error handling.
- `frontend-auth/src/services/api.js` uses Axios with `withCredentials: true` for cookies.
- `frontend-auth/src/routes/ProtectedRoute.js` blocks unauthenticated users.
- `frontend-auth/src/components/Navbar.js` renders login/register or logout links depending on auth state.

## Integrating with `task1`

Use the auth middleware from `task3/backend-auth/middleware/authMiddleware.js` or copy its pattern into `task1/rest-api/middleware/authMiddleware.js`.

Example protection for CRUD routes:

```js
import { protect } from "../middleware/authMiddleware";

router.post("/tasks", protect, createTask);
router.put("/tasks/:id", protect, updateTask);
router.delete("/tasks/:id", protect, deleteTask);
```

This ensures only authenticated users can create, update, or delete tasks.

## Integrating with `task2`

The `task2/2-react-spa` app can reuse the same auth API by configuring its API base URL and enabling `withCredentials` in Axios.

The simplest pattern is:

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `GET /api/auth/me`

If `task2` needs auth state, add an auth context similar to `frontend-auth/src/context/AuthContext.js`.

## Security Notes

- Passwords are hashed with `bcryptjs` before saving. Plain passwords are never stored.
- JWT tokens are signed using `JWT_SECRET` and expire after 7 days.
- `httpOnly` cookies protect tokens from JavaScript access and reduce XSS exposure.
- `sameSite: strict` prevents many CSRF attack patterns.
- Common auth mistakes avoided here:
  - Returning password hashes in API responses
  - Storing auth tokens in localStorage
  - Ignoring token expiration and invalid tokens

## API Examples

### Register

```bash
POST /api/auth/register
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "strongpassword"
}
```

### Login

```bash
POST /api/auth/login
{
  "email": "jane@example.com",
  "password": "strongpassword"
}
```

### Me

```bash
GET /api/auth/me
```

### Logout

```bash
POST /api/auth/logout
```

## Notes

- Do not modify `task1` or `task2` unnecessarily; this module is intentionally separate.
- Use `task3/backend-auth` as a reference auth implementation for the existing task1 backend.
- Use `task3/frontend-auth` as a reusable auth UI and onboarding flow.
