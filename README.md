# Full Stack To-Do List Application

A responsive to-do list application built with TypeScript, Node.js, React, and WebSockets.

## Features

- Add new items to the to-do list using WebSockets for real-time updates
- Store items in Redis cache
- Move items to MongoDB when Redis cache reaches capacity
- Fetch all tasks through a REST API endpoint
- Responsive UI design optimized for desktop, tablet, and mobile views
- Clean MVC architecture

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Socket.io (WebSockets)
- Redis (for caching)
- MongoDB (for persistent storage)

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Socket.io Client

## Project Structure

The project follows MVC (Model-View-Controller) pattern:

- **Models**: Define data structures and interact with the databases
- **Views**: React components that render the UI
- **Controllers**: Handle user actions and update models/views

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Redis instance (configuration provided)
- MongoDB instance (configuration provided)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/Full_Stack_Task
cd Full_Stack_Task
```

2. Install dependencies
```bash
npm run install:all
```

3. Start the development server
```bash
npm start
```

This will start both the backend server and the frontend development server concurrently.

- Backend will run on http://localhost:3001
- Frontend will run on http://localhost:3000

## Environment Setup

The application uses the following configurations:

### Redis Configuration
- Host: redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com
- Port: 12675
- Username: default
- Password: dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB

### MongoDB Configuration
- URL: mongodb+srv://assignment_user:HCgEj5zv8Hxwa4xO@test-cluster.6f94f5o.mongodb.net/
- Database: assignment
- Collection: assignment_yourname (replace with your first name)

## Development Workflow

1. Backend development:
   - Models and services related to data handling are in `server/src/models` and `server/src/services`
   - API endpoints are defined in `server/src/routes`
   - WebSocket event handlers are in `server/src/config/websocket.ts`

2. Frontend development:
   - React components are in `client/src/components`
   - Hooks for WebSocket communication are in `client/src/hooks`
   - TypeScript interfaces are in `client/src/types`
   - CSS styling is handled with Tailwind CSS

## Application Flow

1. **Data Flow**:
   - User adds a new note via the UI
   - Frontend sends the note text to the backend via WebSocket
   - Backend creates a new todo item and stores it in Redis cache
   - When Redis cache exceeds 50 items, the data is moved to MongoDB
   - The new todo is broadcast to all connected clients via WebSocket
   - Frontend receives the new todo and updates the UI

2. **API Endpoints**:
   - `GET /api/fetchAllTasks`: Retrieves all todos from both Redis cache and MongoDB

3. **WebSocket Events**:
   - `add`: Client sends this event to add a new todo
   - `todoAdded`: Server broadcasts this event when a new todo is added
   - `todoDelete`: server detete the specific todo list.

## Deployment

### Building for Production

1. Build the frontend:
```bash
npm run build:client
```

2. Build the backend:
```bash
npm run build:server
```

3. The frontend build will be in the `client/build` directory
4. The backend build will be in the `server/dist` directory

### Deployment Options

- **Heroku**: Use a Procfile with `web: node server/dist/index.js`
- **Vercel/Netlify**: Deploy the frontend build folder
- **Docker**: A Dockerfile is provided for containerized deployment

## Testing

Run tests with:
```bash
# Run backend tests
cd server && npm test

# Run frontend tests
cd client && npm test
```

## Future Improvements

- Add authentication and user accounts
- Add ability to mark tasks as completed
- Add ability to delete tasks
- Add ability to edit tasks
- Add categories or tags for tasks
- Add due dates for tasks
- Add search functionality
- Implement pagination for large task lists
