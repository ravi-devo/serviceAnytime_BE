# Service Anytime - Backend

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Endpoints](#endpoints)

## Overview

Service Anytime is an application developed for users in corporate organizations to get their issues resolved. It's a ticketing tool similar to ServiceNow, allowing users to create, update, and track tickets. The application also includes admin capabilities to manage and resolve user tickets.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

## Features

- User registration and authentication
- Creating, updating, and deleting tickets
- Viewing tickets for the current user
- Admin capabilities to manage all tickets

## Getting Started

1. Clone the repository.
   ```bash
   git clone https://github.com/ravi-devo/serviceAnytime_BE.git
2. Navigate to the project directory.
   ```bash
   cd serviceAnytime_BE
3. Then, 
    ```bash
    npm install
4. ```bash
    npm start

## Usage

To run the application, use the `npm start` command. The backend server will be running, and you can access the endpoints using an API client like Postman or through your frontend application.

## Endpoints

### User Routes

- **POST /api/users/register**
  - Description: Register a new user
  - Parameters: `{ name, username, password, isAdmin }`

- **POST /api/users/login**
  - Description: Log in a user
  - Parameters: `{ username, password }`

### Ticket Routes

- **POST /api/tickets/createTicket**
  - Description: Create a new ticket
  - Middleware: `authMiddleware`
  - Parameters: `{ title, description, createdBy }`

- **GET /api/tickets/allTickets**
  - Description: Get all tickets (admin only)
  - Middleware: `adminAuthMiddleware`
  - Parameters: None

- **GET /api/tickets/currentUser**
  - Description: Get tickets for the current user
  - Middleware: `authMiddleware`
  - Parameters: None

- **GET /api/tickets/:id**
  - Description: Get a specific ticket by ID
  - Middleware: `authMiddleware`
  - Parameters: `id`

- **PUT /api/tickets/:ticketId**
  - Description: Update a ticket by ID
  - Middleware: `authMiddleware`
  - Parameters: `{ title, description, status, priority, assignmentGroup, assignee }`

- **DELETE /api/tickets/:ticketId**
  - Description: Delete a ticket by ID (admin only)
  - Middleware: `adminAuthMiddleware`
  - Parameters: `ticketId`

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, please open an issue or create a pull request.

