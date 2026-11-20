# MERN CRUD - User Management System

A full-stack **User Management System** built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It provides complete **CRUD** (Create, Read, Update, Delete) operations with a modern, responsive dark-themed UI.

---

## Features

- **Create** - Register new users with name, email, and address
- **Read** - View all users in a responsive card grid with live search & filter
- **Update** - Edit user details with a pre-filled form
- **Delete** - Remove users with a confirmation modal
- **Validation** - Client-side and server-side input validation
- **Duplicate Guard** - Prevents duplicate email registration
- **Toast Notifications** - Real-time feedback for every action
- **Responsive Design** - Fully responsive on mobile, tablet and desktop

---

## Tech Stack

| Layer      | Technology                     |
|------------|-------------------------------|
| Database   | MongoDB Atlas + Mongoose       |
| Backend    | Node.js + Express.js           |
| Frontend   | React 19 + Vite                |
| Routing    | React Router DOM v7            |
| HTTP       | Axios                          |
| UI Icons   | Lucide React                   |
| Toasts     | React Hot Toast                |

---

## Project Structure

```
crud_operations-MERN-/
├── backend/
│   ├── controller/
│   │   └── userController.js    # CRUD logic (create, read, update, delete)
│   ├── model/
│   │   └── userModel.js         # Mongoose schema with validation & timestamps
│   ├── routes/
│   │   └── userRoute.js         # Express REST routes
│   ├── .env                     # Environment variables (PORT, DB_URL)
│   ├── .gitignore
│   └── index.js                 # Express server entry point
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── userApi.js        # Axios API client
    │   ├── components/
    │   │   ├── Navbar.jsx        # Sticky navigation bar
    │   │   ├── UserList.jsx      # User card grid with search & delete modal
    │   │   └── UserForm.jsx      # Reusable create/edit form
    │   ├── pages/
    │   │   ├── Home.jsx          # Dashboard / landing page
    │   │   ├── UsersPage.jsx
    │   │   ├── CreateUser.jsx
    │   │   └── EditUser.jsx
    │   ├── App.jsx               # Router setup + Toast config
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Global styles (dark theme)
    └── vite.config.js            # Vite + /api proxy config
```

---

## REST API Reference

| Method   | Endpoint                      | Description          |
|----------|-------------------------------|----------------------|
| `POST`   | `/api/users/create`           | Create a new user    |
| `GET`    | `/api/users/`                 | Get all users        |
| `GET`    | `/api/users/:id`              | Get a user by ID     |
| `PUT`    | `/api/users/update/:id`       | Update a user        |
| `DELETE` | `/api/users/delete/:id`       | Delete a user        |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/nisulaRap/crud_operations-MERN-.git
cd crud_operations-MERN-
```

### 2. Configure environment variables

Edit `backend/.env`:

```env
PORT=8000
DB_URL=your_mongodb_connection_string
```

### 3. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run the application

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:8000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### 5. Open in browser

Navigate to **[http://localhost:5173](http://localhost:5173)**

---

## Environment Variables

| Variable  | Description                          | Example                              |
|-----------|--------------------------------------|--------------------------------------|
| `PORT`    | Port for the Express server          | `8000`                               |
| `DB_URL`  | MongoDB connection string            | `mongodb+srv://user:pass@cluster...` |

