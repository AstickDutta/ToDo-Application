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
   ```bash
   git clone https://github.com/your-repo/todo-app.git
   cd todo-app
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory with the following variables:

plaintext
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-db
JWT_SECRET=your_jwt_secret_key
Start the development server:

bash
Copy code
npm run dev
Access the application:

Base URL: http://localhost:5000
Endpoints Documentation
Authentication Endpoints
Login
POST /api/v1/auth/login
Description: Authenticate a user and return a JWT token.
Request Body:
json
Copy code
{
  "email": "user@example.com",
  "password": "password123"
}
Response:
json
Copy code
{
  "status": true,
  "token": "your_jwt_token"
}
Logout
POST /api/v1/auth/logout
Description: Logout the user by updating their status.
Headers: Authorization: Bearer <token>
Response:
json
Copy code
{
  "status": true,
  "message": "Logout successful"
}
To-Do Endpoints
Create To-Do
POST /api/v1/todos
Headers: Authorization: Bearer <token>
Request Body:
json
Copy code
{
  "title": "Buy groceries",
  "description": "Milk, Eggs, Bread",
  "dueDate": "2024-11-25",
  "priority": "High",
  "category": "Personal"
}
Response:
json
Copy code
{
  "status": true,
  "message": "New todo created successfully",
  "newTodo": { ... }
}
Get To-Do List
GET /api/v1/todos
Headers: Authorization: Bearer <token>
Query Parameters (optional):
status: Filter by task status.
priority: Filter by task priority.
category: Filter by category.
dueDate: Filter by tasks due before a specific date.
nearDueDate=true: Fetch tasks due in the next 3 days.
page, limit: For pagination.
sort: Sort by a field (default: -createdAt).
Response:
json
Copy code
{
  "status": true,
  "message": "To-do list fetched successfully",
  "totalCount": 5,
  "currentPage": 1,
  "totalPages": 1,
  "todos": [ ... ]
}
Update To-Do
PATCH /api/v1/todos/:id
Headers: Authorization: Bearer <token>
Request Body (partial update):
json
Copy code
{
  "status": "Completed",
  "priority": "Medium"
}
Response:
json
Copy code
{
  "status": true,
  "message": "To-Do updated successfully",
  "todo": { ... }
}
Delete To-Do
DELETE /api/v1/todos/:id
Headers: Authorization: Bearer <token>
Response:
json
Copy code
{
  "status": true,
  "message": "To-do deleted successfully"
}
Testing
Postman Collection

Import the provided Postman Collection into Postman.
Test all endpoints with pre-configured requests and examples.
Test JWT Token Flow

Login to generate a token.
Use the token in the Authorization header for secure endpoints.
Logout to invalidate the session.
Test Query Parameters

Fetch to-dos nearing their due date using nearDueDate=true.
Run Validation Tests

Send invalid requests (e.g., missing required fields) to ensure proper error messages are returned.
Error Handling
Centralized error handling middleware:

ValidationError: Handles invalid input fields.
CastError: Handles invalid IDs.
Duplicate Key Error: Handles unique constraint violations.
Not found handler for invalid routes.

Folder Structure
bash
Copy code
├── controllers/       # Business logic for routes
├── middlewares/       # Custom middleware (auth, error handlers)
├── models/            # Mongoose schemas
├── routes/            # API route definitions
├── validations/       # Joi validation schemas
├── utils/             # Helper functions (e.g., JWT generation)
├── .env               # Environment variables
├── app.js             # Application setup
├── README.md          # Project documentation
