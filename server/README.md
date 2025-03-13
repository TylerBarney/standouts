# Server

This is the backend API server for the application, built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=5001
   MONGO_URI=mongodb+srv://admin:${MONGO_PASSWORD}@standout.zwz5u.mongodb.net/?retryWrites=true&w=majority&appName=Standout
   MONGO_USER=admin
   MONGO_PASSWORD=your_password
   DB_SECURITY_KEY=your_security_key
   NODE_ENV=development
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Testing

The application includes comprehensive test scripts that can be run using npm:

### Running All Tests

```
npm test
```

This will run all test suites sequentially.

### Database Connection Tests

```
npm run test:db
```

Tests MongoDB connection and model operations, verifying:
- Connection to MongoDB
- Business model operations
- Employee model operations with resume_pdf
- Job Opening model operations
- Applicant model operations

### API Endpoint Tests

```
npm run test:api
```

Tests all API endpoints and verifies data is correctly saved to the database:
- Business creation and retrieval
- Employee management with resume_pdf
- Job Opening management
- Applicant tracking
- Resume PDF handling

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/test` | GET | Simple test endpoint |
| `/api/business/:businessId/info` | GET | Get business info |
| `/api/business` | POST | Create a new business |
| `/api/business/:businessId/employees` | GET | Get employees for a business |
| `/api/employees` | POST | Add a new employee |
| `/api/business/:businessId/job-openings` | GET | Get job openings for a business |
| `/api/job-openings` | POST | Add a new job opening |
| `/api/business/:businessId/applicants` | GET | Get applicants for a business |
| `/api/applicants` | POST | Add a new applicant |
| `/api/business/:businessId/resumes` | GET | Get all resumes |
| `/api/resumes` | POST | Add/update a resume | 