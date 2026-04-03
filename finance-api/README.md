<div align="center">
<h1>💸 Zorvyn Finance Dashboard API</h1>
<p>
<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" alt="Node.js" /></a>
<a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white" alt="Express.js" /></a>
<a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
<a href="#"><img src="https://img.shields.io/badge/REST-API-FF6C37?logo=postman&logoColor=white" alt="REST API" /></a>
</p>
</div>

## 📌 1. Project Overview
A Node.js and Express backend built for a Finance Dashboard. It includes Role-Based Access Control (RBAC), stateless JWT authentication, and strict input validation using Zod. My primary goal was to build a clean, predictable API that properly handles filtering, pagination, and data aggregation for a frontend application.

---

## 🛠️ 2. Setup Instructions
Getting the backend running on your local machine is quick and straightforward.

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL running locally (port 5432 by default)

### Getting Started

**Install Dependencies**
```bash
npm install
```

**Environment Variables**
Create a `.env` file in the root directory. Feel free to update the `DATABASE_URL` with your local Postgres credentials:
```env
PORT=3000
DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/finance_db
JWT_SECRET=supersecret123
```

**Run Migrations & Seed Data**
This will automatically set up the database tables and inject a default Admin user so you can start testing immediately:
```bash
npm run db:migrate
npm run db:seed
```
*(Default Admin User: Email — `admin@finance.local`, Password — `admin123`)*

**Start the Server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm run start
```
The API will now be listening at `http://localhost:3000`.

---

## 🚀 3. How to Test the API (Postman)
To make testing easy, I've included a Postman collection in the root folder named `Zorvyn.postman_collection.json`.

Simply import this file into Postman. The collection is organized logically by feature and includes pre-configured examples for fetching single records, pagination, filtering, and role-based access endpoints.

*(Note: Please run the "Authenticate a User" route first to grab a JWT token for the protected routes!)*

---

## 🏗️ 4. Design Decisions & Architecture
For this assignment, I focused on standard RESTful conventions and a clean separation of concerns to keep the codebase maintainable:

- **Controller-Service-Repository Pattern**: The architecture is split into three layers. Controllers simply handle HTTP requests/responses, Services manage the core business logic, and Repositories handle the actual Knex/PostgreSQL database queries.
- **Middleware for Reusability**: Authentication, role verification (Admin, Analyst, Viewer), and error handling are extracted into modular Express middleware. This keeps the controllers clean and prevents repetitive code.
- **Data Validation**: I used Zod for schema validation. Failed validations automatically throw a structured `400 Bad Request` with an `errors` array, making it incredibly easy for a frontend developer to render form feedback.
- **Dynamic Filtering**: Instead of hardcoding separate routes for different data views, endpoints like `GET /api/records` utilize query parameters (`?page=1&limit=10&type=income`) to handle pagination and filtering dynamically.

---

## 🤔 5. Tradeoffs & Future Improvements
Because time is finite, conscious engineering tradeoffs were made. If I were preparing this application for a true production environment, I would implement the following improvements:

- **Automated Testing**: I would add integration tests using Jest and Supertest to ensure the RBAC logic and data aggregations never regress.
- **Rate Limiting**: Implementing something like `express-rate-limit` to protect the authentication routes from brute-force attacks.
- **Soft Deletes**: In a real financial application, records should rarely be permanently destroyed. I would update the database schema to use a `deleted_at` timestamp instead of hard-deleting transactions.
