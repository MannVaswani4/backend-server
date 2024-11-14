# Expense Tracker API

## Overview
The Expense Tracker API provides a backend service for managing personal income and expenses. It includes secure user authentication and CRUD operations for managing income and expenses using Node.js, Prisma, and SQL.

## Features
- **User Authentication**: Register and login functionality with JWT-based authentication.
- **Income Management**: Create, read, update, and delete (CRUD) operations for income records.
- **Expense Management**: Full CRUD operations for expense records.
- **Authorization Middleware**: Protect routes to ensure only authenticated users can manage their records.

## Tech Stack
- **Node.js**: Backend framework for building the API.
- **Prisma**: ORM for interacting with a SQL database.
- **SQL**: Used for data persistence.
- **JWT**: Token-based authentication for secure API access.

## Routes

### Authentication
- `POST /signup`: Register a new user.
- `POST /login`: Login an existing user and receive a JWT token.

### Income Management
- `POST /add-income`: Add a new income record.  
  _(Protected Route: Requires JWT)_
- `GET /get-incomes`: Get all income records for the authenticated user.  
  _(Protected Route: Requires JWT)_
- `DELETE /delete-income/:id`: Delete an income record by its ID.  
  _(Protected Route: Requires JWT)_
- `PUT /update-income/:id`: Update an income record by its ID.  
  _(Protected Route: Requires JWT)_

### Expense Management
- `POST /add-expense`: Add a new expense record.  
  _(Protected Route: Requires JWT)_
- `GET /get-expenses`: Get all expense records for the authenticated user.  
  _(Protected Route: Requires JWT)_
- `DELETE /delete-expense/:id`: Delete an expense record by its ID.  
  _(Protected Route: Requires JWT)_
- `PUT /update-expense/:id`: Update an expense record by its ID.  
  _(Protected Route: Requires JWT)_

## Middleware
- **authMiddleware**: Ensures that only authenticated users can access protected routes by verifying the JWT token.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/expense-tracker-api.git
2. Install dependencies:
   ```bash
    npm install
3. Set up environment variables (e.g., .env file):
    ```bash
      DATABASE_URL=your_database_url
      JWT_SECRET=your_jwt_secret
4. Run migrations with Prisma:
   ```bash
    npx prisma migrate dev
5. Start the server:
   ```bash
   npm start
## Usage
Once the server is running, you can use Postman or any API client to interact with the API. Make sure to include the JWT token in the `Authorization` header for protected routes.

## License
This project is licensed under the MIT License.



