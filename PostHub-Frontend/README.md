# PostHub Frontend

A polished React + Vite + Material UI frontend for the PostHub Spring Boot API.

## Stack

- React
- Vite
- Material UI
- React Router
- Axios
- Context API + useReducer

## Run locally

```bash
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:8080` by default.
You can override it with:

```env
VITE_API_URL=http://localhost:8080
```

Copy `.env.example` to `.env` when you need a custom API URL.

## Current application structure

```text
src/
├── API/
│   └── api.js
├── Components/
│   ├── EmptyState.jsx
│   ├── ErrorState.jsx
│   ├── Loading.jsx
│   ├── Navbar.jsx
│   ├── PageContainer.jsx
│   ├── PostCard.jsx
│   └── PostSkeleton.jsx
├── Context/
│   ├── AuthContext.jsx
│   ├── FeedbackContext.jsx
│   └── PostContext.jsx
├── Pages/
│   ├── Admin.jsx
│   ├── CreatePost.jsx
│   ├── EditPost.jsx
│   ├── Login.jsx
│   ├── MyPosts.jsx
│   ├── PostDetails.jsx
│   ├── Posts.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   └── Users.jsx
├── App.jsx
├── main.jsx
└── theme.js
```

## UX improvements included

- Responsive navigation with a mobile drawer
- Consistent MUI theme and spacing
- Responsive post cards with image support
- Skeleton loading states
- Empty states and retryable errors
- Success/error snackbars
- Form validation and disabled submit states
- Search + server pagination
- Protected routes
- Role-aware Admin navigation
- Profile and My Posts layouts
- Confirmation dialogs for destructive actions
- Reusable components and cleaner Context/reducer organization

## Backend assumptions

The current frontend keeps the API routes already used by the project, including `/posts`, `/post/:id`, `/updatePost/:id`, `/userss`, `/users/:id/posts`, and `/login`.

The login endpoint is expected to return the JWT as a string. The JWT payload is used for `id`/`userId`, `email`/`sub`, and `role` claims.
