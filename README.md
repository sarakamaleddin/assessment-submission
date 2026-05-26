# Product Dashboard Assessment

A full-stack product dashboard application built with:

- Frontend: Next.js + TypeScript
- Backend: Node.js + Express
- Validation: Zod
- Authentication: JWT
- Process Manager: PM2

---

# Project Structure

```bash
assessment-submission/
├── api-nodejs/         # Backend API
├── dashboard-nextjs/   # Frontend Dashboard
└── README.md
```

---

# Features

## Backend
- JWT authentication
- Product listing
- Product filtering
- Product search
- Product status update
- Zod validation
- Centralized error handling
- Request logging
- PM2 configuration

## Frontend
- Product dashboard UI
- Search products
- Filter by status
- Loading states
- Error handling
- Empty states
- Responsive layout
- API response validation with Zod

---

# Assumptions

- The application uses in-memory storage only.
- No database persistence is required.
- A single JWT token is enough for testing purposes.
- Authentication is required for all product endpoints.
- The frontend and backend run locally.

---

# Security Notes

- JWT authentication protects all product routes.
- Input validation is handled using Zod schemas.
- Invalid tokens return unauthorized responses.
- Error handling prevents exposing internal server details in production mode.
- Request validation is performed both on backend requests and frontend responses.

---

# Improvements Beyond Requirements

1. Added frontend response validation using Zod to ensure API response integrity.

2. Added loading, empty, and detailed error states in the frontend UI for better user experience.

3. Added PM2 ecosystem configuration for production process management.

4. Added centralized logging middleware for request monitoring.

---

# Backend Setup

## Navigate to backend

```bash
cd api-nodejs
```

## Install dependencies

```bash
npm install
```

## Create .env file

```env
PORT=3001
JWT_SECRET=jwt_secret_here
NODE_ENV=development
```

## Run backend

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:3001
```

---

# Generate JWT Token

Run:

```bash
node src/generateToken.js
```

Copy the generated token.

Use it in requests:

```txt
Authorization: Bearer YOUR_TOKEN
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd dashboard-nextjs
```

## Install dependencies

```bash
npm install
```

## Create .env.local file

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# API Endpoints

## Health Check

```http
GET /health
```

Example:

```bash
curl http://localhost:3001/health
```

---

## Get All Products

```http
GET /api/products
```

Example:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
http://localhost:3001/api/products
```

---

## Filter Products By Status

```http
GET /api/products?status=active
```

Example:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
"http://localhost:3001/api/products?status=active"
```

---

## Search Products

```http
GET /api/products?search=laptop
```

Example:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
"http://localhost:3001/api/products?search=laptop"
```

---

## Get Product By ID

```http
GET /api/products/:id
```

Example:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
http://localhost:3001/api/products/fd0a3b1c-1c2c-4008-98ba-2fd5ee3fc664
```

---

## Create Product

```http
POST /api/products
```

Example:

```bash
curl -X POST http://localhost:3001/api/products \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "name": "Keyboard",
  "status": "active",
  "price": 50,
  "description": "Mechanical keyboard"
}'
```

---

## Update Product Status

```http
PUT /api/products/:id/status
```

Example:

```bash
curl -X PUT http://localhost:3001/api/products/fd0a3b1c-1c2c-4008-98ba-2fd5ee3fc664/status \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "status": "inactive"
}'
```

---

# Run With PM2

## Start application

```bash
pm2 start ecosystem.config.js
```

## View logs

```bash
pm2 logs
```

---

# Technologies Used

## Frontend
- Next.js
- React
- TypeScript
- CSS Modules
- Zod

## Backend
- Node.js
- Express
- JWT
- Zod
- PM2
