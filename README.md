# To-Do Application API

This project is a **To-Do Management System** that allows users to create, read, update, and delete (CRUD) to-do items. The system includes advanced features like filtering by due dates, prioritizing tasks, and fetching tasks nearing their due dates. Authentication is implemented using JWT to ensure secure access to APIs.

---

## **Features**

- **User Authentication**
  - Login and Logout with JWT tokens.
  - Protected routes for secure access.
- **CRUD Operations on To-Dos**
  - Create, Read, Update, and Delete tasks.
  - Soft deletion of tasks.
- **Advanced Filtering**
  - Filter tasks by `status`, `priority`, `category`, and `dueDate`.
  - Fetch tasks nearing their due date (within the next 3 days).
- **Pagination & Sorting**
  - Paginated response for large datasets.
  - Sorting tasks by created date or custom fields.
- **Validation**
  - Request validation using `Joi`.
  - Comprehensive error handling middleware.
  
---

## **Tech Stack**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT
- **Validation**: Joi
- **Tools**: Postman (for testing)

---

## **Setup Instructions**

1. Clone the repository:
   bash
   (https://github.com/AstickDutta/ToDo-Application.git)
   cd ToDo-Application


## API Endpoints for To-Do Application

The following API endpoints are available for the To-Do application hosted on Render.

https://todo-application-wdyz.onrender.com

Endpoints Documentation
SignUp
POST https://todo-application-wdyz.onrender.com/api/v1/auth/signup
Description: for create user

Login
POST https://todo-application-wdyz.onrender.com/api/v1/auth/login
Description: Authenticate a user and return a JWT token.


Logout
POST https://todo-application-wdyz.onrender.com/api/v1/auth/logout/:id
Description: Logout the user by updating their status.


To-Do Endpoints
Create To-Do
POST https://todo-application-wdyz.onrender.com/api/v1/todos

Get To-Do List
GET https://todo-application-wdyz.onrender.com/api/v1/todos

Update To-Do
PATCH https://todo-application-wdyz.onrender.com/api/v1/todos/:id

Delete To-Do
DELETE https://todo-application-wdyz.onrender.com/api/v1/todos/:id

Folder Structure

├── controllers/       # Business logic for routes
├── middlewares/       # Custom middleware (auth, error handlers)
├── models/            # Mongoose schemas
├── routes/            # API route definitions
├── validations/       # Joi validation schemas
├── utils/             # Helper functions (e.g., JWT generation)
├── .env               # Environment variables
├── app.js             # Application setup
├── README.md          # Project documentation
