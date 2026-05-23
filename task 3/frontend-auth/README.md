# frontend-auth

This React application is a standalone authentication UI for task3. It connects to the backend-auth API using httpOnly cookies and protects routes with React Router.

## Setup

1. Install dependencies:
   ```bash
   cd task\ 3/frontend-auth
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```

## Environment

By default the app uses `http://localhost:5001` as the backend API base URL. Update the service configuration in `src/services/api.js` if needed.

## Features

- Login
- Register
- Dashboard protected route
- Auth persistence via httpOnly cookie
- Axios with credentials for cross-site cookie support
