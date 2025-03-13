# InstantConnect

A real-time chat application built using the MERN (MongoDB, Express, React, Node.js) stack and Socket.IO for seamless communication.

## Features

- Real-time messaging with Socket.IO
- User authentication (JWT-based)
- Private and group chats
- Message history stored in MongoDB
- Responsive UI using React

## Tech Stack

- **Frontend:** React, Shadcn-ui
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Real-time Communication:** Socket.IO
- **Authentication:** JWT (JSON Web Token)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/abhisekh9/mern-chat-app.git
   cd mern-chat-app
   ```

2. Install dependencies for both frontend and backend:

   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the backend folder and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   ```

4. Start the backend server:

   ```sh
   cd backend
   npm start
   ```

5. Start the frontend server:

   ```sh
   cd frontend
   npm start
   ```

## Usage

- Register/Login to access the chat
- Create/join a chat room
- Send real-time messages
- Logout securely

##

