Expense Tracker API
Overview
The Expense Tracker API provides a backend service for managing personal income and expenses. It includes secure user authentication and CRUD operations for managing income and expenses using Node.js, Prisma, and SQL.

Features
User Authentication: Register and login functionality with JWT-based authentication.
Income Management: Create, read, update, and delete (CRUD) operations for income records.
Expense Management: Full CRUD operations for expense records.
Authorization Middleware: Protect routes to ensure only authenticated users can manage their records.
Tech Stack
Node.js: Backend framework for building the API.
Prisma: ORM for interacting with a SQL database.
SQL: Used for data persistence.
JWT: Token-based authentication for secure API access.
Routes
Authentication
POST /signup: Register a new user.
POST /login: Login an existing user and receive a JWT token.
Income Management
POST /add-income: Add a new income record.
(Protected Route: Requires JWT)
GET /get-incomes: Get all income records for the authenticated user.
(Protected Route: Requires JWT)
DELETE /delete-income/:id: Delete an income record by its ID.
(Protected Route: Requires JWT)
PUT /update-income/:id: Update an income record by its ID.
(Protected Route: Requires JWT)
Expense Management
POST /add-expense: Add a new expense record.
(Protected Route: Requires JWT)
GET /get-expenses: Get all expense records for the authenticated user.
(Protected Route: Requires JWT)
DELETE /delete-expense/:id: Delete an expense record by its ID.
(Protected Route: Requires JWT)
PUT /update-expense/:id: Update an expense record by its ID.
(Protected Route: Requires JWT)
Middleware
authMiddleware: Ensures that only authenticated users can access protected routes by verifying the JWT token.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/expense-tracker-api.git
Install dependencies:

bash
Copy code
npm install
Set up environment variables (e.g., .env file):

bash
Copy code
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
Run migrations with Prisma:

bash
Copy code
npx prisma migrate dev
Start the server:

bash
Copy code
npm start
Usage
Once the server is running, you can use Postman or any API client to interact with the API. Make sure to include the JWT token in the Authorization header for protected routes.

License
This project is licensed under the MIT License.

