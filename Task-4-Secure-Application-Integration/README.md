# Secure Application Integration

## Project Overview
This project is developed as part of the EdVyro Internship Task 4 – Secure Application Integration.

The application integrates a frontend with a backend API to display internship opportunities and allow users to submit applications. It includes client-side and server-side validation, loading and error states, rate limiting, secure HTTP headers, and parameterized database queries.

## Features
- Display internship data from the backend API
- Show loading and failure states while fetching data
- Retry loading internship data after a failure
- Internship details and application form
- Client-side form validation
- Server-side form validation
- API rate limiting
- Secure HTTP headers using Helmet
- Parameterized SQL queries using SQLite

## Technology Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: SQLite with better-sqlite3
- Security: Helmet, express-rate-limit
- API: REST API

## Project Structure
```text
Task-4-Secure-Application-Integration/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── db.js
│   └── server.js
├── README.md
├── SECURITY-CHECKLIST.md
└── TEST-REPORT.md
```

*Note: The folder and file names above should be adjusted to match the actual project structure.*

## Setup and Run

### Backend
1. Open the backend folder in the terminal.
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the backend using the start command configured in `backend/package.json`.
4. The API is expected to run at:
   ```text
   http://localhost:4000
   ```

### Frontend
1. Open the frontend folder.
2. Run the frontend using the development server or local server configured for the project.
3. Open the frontend URL in a browser.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/internships` | Retrieve internship listings |
| POST | `/api/internships/:id/apply` | Submit an application for an internship |

## Security Measures
- Input validation is performed on both frontend and backend.
- Helmet is used to set secure HTTP headers.
- Express rate limiting is applied to API routes.
- SQL queries use parameterized statements to reduce SQL injection risk.
- Application data is validated before database insertion.

## Documentation
- `TEST-REPORT.md` – Test cases and their results.
- `SECURITY-CHECKLIST.md` – Security measures implemented in the application.

## Project Status
The application integration and the required security features have been implemented. Testing results are documented in the test report.
