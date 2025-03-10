# React & Node.js Web Application

A full-stack web application with a React frontend and Node.js backend. The frontend includes a floating navigation menu powered by Material UI and routing capability. The backend is set up to connect to MongoDB and has routes ready for API implementation.

## Project Structure

- **client** - React frontend with Material UI
- **server** - Node.js backend with Express

## Features

- React frontend with React Router for navigation
- Material UI components for consistent styling
- Floating left navigation menu with responsive design
- Node.js backend with Express framework
- MongoDB integration using Mongoose
- API ready structure

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (running locally or connection string to remote instance)

## Installation & Setup

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/myapp
   NODE_ENV=development
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Running the Application

- Frontend will be available at: http://localhost:3000
- Backend API will be available at: http://localhost:5001/api

## Development

- To add new API endpoints, create new route files in the `server/routes` directory
- To add new frontend pages, create components in the `client/src/pages` directory and add routes in `App.js` 