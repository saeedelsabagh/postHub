# 🚀 PostHub — Full Stack Social Platform

PostHub is a full-stack web application built with **React** and **Spring Boot**.

The application allows users to create, manage, and explore posts with secure authentication, role-based authorization, image uploading, search, pagination, and user management.

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- BCrypt password hashing
- Role-based authorization (`USER` / `ADMIN`)
- Protected routes and endpoints
- Post ownership authorization
- Custom Spring Security configuration

### 📝 Post Management
- Create posts
- View all posts
- View post details
- Edit posts
- Delete posts
- Manage personal posts
- Search posts
- Pagination
- Image upload for posts

### 👤 User Management
- User registration
- User profile
- View users
- View user details
- Update user information
- Delete users
- Admin user management

### 👑 Admin
- Admin dashboard
- Admin-only operations
- User management
- Role-based access control

### 🛡️ Validation & Error Handling
- DTO-based API requests
- Request validation
- Global exception handling
- Custom exceptions
- Unauthorized and forbidden request handling

---

## 🛠️ Tech Stack

### Languages
- Java
- JavaScript
- HTML
- CSS
- SQL

### Frontend
- React
- React Router
- Material UI
- Axios
- Context API
- Vite

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Maven

### Database
- MySQL

### Development Tools
- Git
- GitHub
- Postman
- IntelliJ IDEA
- VS Code

---

## 🏗️ Project Architecture

```text
PostHub-FullStack
│
├── PostHub-Frontend
│   └── React Application
│
└── demo
    └── Spring Boot REST API
