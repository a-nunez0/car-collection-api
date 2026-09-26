# Car Collection API

A RESTful backend API for managing a personal car collection and vehicle maintenance records. Built with Node.js, Express, and MongoDB, with GitHub OAuth authentication for protected operations.

## Features

- Create, read, update, and delete vehicles
- Store vehicle details such as make, model, year, mileage, price, fuel type, and condition
- Manage vehicle maintenance records
- Search and retrieve vehicle data
- GitHub OAuth authentication
- Protected create, update, and delete routes
- MongoDB database integration
- Swagger/OpenAPI documentation
- Environment-based configuration for sensitive credentials

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Passport.js
- GitHub OAuth
- Swagger / OpenAPI
- JavaScript

## API Endpoints

### Cars

| Method | Endpoint | Description | Authentication |
| --- | --- | --- | --- |
| GET | `/cars` | Get all cars | Public |
| GET | `/cars/:id` | Get a specific car | Public |
| POST | `/cars` | Add a new car | Required |
| PUT | `/cars/:id` | Update a car | Required |
| DELETE | `/cars/:id` | Delete a car | Required |

### Maintenance

The API also includes routes for managing service and maintenance records associated with vehicles.

## Authentication

The application uses GitHub OAuth through Passport.js. Authentication is required before users can create, update, or delete vehicles.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/a-nunez0/car-collection-api.git
cd car-collection-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=your_database_name
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
CALLBACK_URL=http://localhost:3000/auth/github/callback
SESSION_SECRET=your_session_secret
```

### 4. Start the server

```bash
npm start
```

The API runs locally at `http://localhost:3000`.

## API Documentation

Swagger/OpenAPI documentation is included for exploring and testing the available API endpoints.

## Security

Database credentials, OAuth secrets, and session secrets are stored using environment variables and excluded from version control.

## Author

**Alvaro Nunez**

Software Engineering Student  
Brigham Young University - Idaho