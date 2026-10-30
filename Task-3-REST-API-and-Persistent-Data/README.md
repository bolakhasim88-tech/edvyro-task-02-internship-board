
# Task 3: REST API and Persistent Data – Internship Board

## Project Overview

This project is a RESTful API for an Internship Board application. It allows users to create, view, update, and delete internship records.

The backend is developed using Node.js and Express.js, with SQLite as the database.

## Technologies Used

- Node.js
- Express.js
- SQLite
- better-sqlite3
- JavaScript
- Thunder Client

## Features

- Create a new internship
- Retrieve all internships
- Retrieve internships with pagination
- Update an existing internship
- Delete an internship
- Input validation
- Error handling
- SQLite database persistence

## Project Structure

Task-3-REST-API-and-Persistent-Data/
├── README.md
└── backend/
    ├── database/
    │   ├── internships.db
    │   ├── schema.sql
    │   └── seed.sql
    ├── routes/
    │   └── internshipRoutes.js
    ├── db.js
    ├── server.js
    ├── package.json
    └── package-lock.json
    
## Installation

### 1. Clone or Download the Project

Download the project and open the backend folder in VS Code.

### 2. Install Dependencies

Run the following command:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=4000
```

### 4. Start the Development Server

```bash
npm run dev
```

The server will run at:

```text
http://localhost:4000
```

## API Endpoints

Base URL:

```text
http://localhost:4000/api/internships
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/internships` | Get all internships |
| GET | `/api/internships?page=1&limit=10` | Get internships with pagination |
| GET | `/api/internships/:id` | Get a single internship by ID |
| POST | `/api/internships` | Create an internship |
| PUT | `/api/internships/:id` | Update an internship |
| DELETE | `/api/internships/:id` | Delete an internship |

## Create Internship

### Request

```http
POST /api/internships
Content-Type: application/json
```

### Request Body

```json
{
  "title": "Frontend Developer Intern",
  "company": "EdVyro",
  "location": "Hyderabad",
  "type": "Remote",
  "description": "Learn React, HTML, CSS, and JavaScript."
}
```

### Success Response

```json
{
  "success": true,
  "message": "Internship created successfully",
  "data": {
    "id": 1,
    "title": "Frontend Developer Intern",
    "company": "EdVyro",
    "location": "Hyderabad",
    "type": "Remote",
    "description": "Learn React, HTML, CSS, and JavaScript."
  }
}
```

## Get Internship by ID

### Request

```http
GET /api/internships/5
```

### Success Response

```json
{
  "success": true,
  "data": {
    "id": 5,
    "title": "Frontend Developer Intern - Updated",
    "company": "TechNova Solutions",
    "location": "Remote",
    "type": "Paid",
    "description": "Build responsive web interfaces using HTML, CSS, and JavaScript. Learn modern frontend development practices.",
    "created_at": "2026-10-29 08:39:20",
    "domain": "Web Development",
    "duration": "3 Months",
    "stipend": "₹8,000 / month",
    "logo": "T"
  }
}
```

### Error Responses

Invalid ID (`400 Bad Request`):

```json
{
  "success": false,
  "message": "Invalid internship ID"
}
```

Internship not found (`404 Not Found`):

```json
{
  "success": false,
  "message": "Internship not found"
}
```


## Update Internship

### Request

```http
PUT /api/internships/5
Content-Type: application/json
```

### Request Body

```json
{
  "title": "Frontend Developer Intern - Updated",
  "company": "TechNova Solutions",
  "location": "Remote",
  "type": "Paid",
  "description": "Build responsive web interfaces using HTML, CSS, and JavaScript."
}
```

### Success Response

```json
{
  "success": true,
  "message": "Internship updated successfully"
}
```


## Delete Internship

### Request

```http
DELETE /api/internships/16
```

### Success Response

```json
{
  "success": true,
  "message": "Internship deleted successfully"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Internship not found"
}
```

## Pagination

Example request:

```http
GET /api/internships?page=1&limit=2
```

Pagination parameters:

- `page`: Page number (minimum 1)
- `limit`: Number of records per page (1 to 100)

## Validation

The API validates required fields:

- title
- company
- location
- type
- description

Empty or invalid fields are rejected with a `400 Bad Request` response.

## Error Handling

The API uses appropriate HTTP status codes:

- `200 OK` — Request successful
- `201 Created` — Internship created
- `400 Bad Request` — Invalid request data
- `404 Not Found` — Internship not found
- `500 Internal Server Error` — Server error


## Database

This project uses SQLite for persistent data storage with `better-sqlite3`.

### Database Files

```text
database/
├── internships.db
├── schema.sql
└── seed.sql
```

- `internships.db` — SQLite database file.
- `schema.sql` — Defines the internships table and its columns.
- `seed.sql` — Contains 9 sample internship records for testing.

The database folder and internships table are created automatically when the backend starts.

### Schema and Seed Data

The table schema is defined in `schema.sql`.

The sample records are provided in `seed.sql`. The seed file is intended for a fresh database and should not be executed repeatedly on a database that already contains the same IDs.

## Testing

The API endpoints were tested using Thunder Client in VS Code.

Tests include:

- Creating internships
- Retrieving internship records
- Updating internships
- Deleting internships
- Pagination
- Invalid input validation
- Invalid ID handling
- Not found error handling

## Author

EdVyro Internship — Backend Development Task
