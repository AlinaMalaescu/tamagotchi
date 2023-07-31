Technologies Used


MongoDB: A NoSQL database used to store the pet data and maintain persistence.
Express: A Node.js web application framework used for building the backend API.
React: A JavaScript library used to build the user interface of the app.
Node.js: A JavaScript runtime used for running the backend server.
React Router: A package used for handling client-side routing in the React app.
Mongoose: A package used for MongoDB object modeling in Node.js.


INSTALATION

# Prerequisites

Node.js and npm: Make sure you have Node.js and npm (Node Package Manager) installed on your machine.

# Backend Setup
Clone the repository:

git clone https://github.com/AlinaMalaescu/tamagotchi.git

Navigate to the backend directory:

cd backend
Install the required dependencies:

npm install
Create a .env file in the backend directory and add the following environment variables:
MONGO_URI=your-mongodb-connection-string

Run the backend server:
node server.js

The backend server will start on http://localhost:8080.

# Frontend Setup

Open a new terminal and navigate to the frontend directory:

cd tamagotchi-app/client

Install the required dependencies:

npm install

Start the React development server:
npm start
The React app will be accessible at http://localhost:3000.


# DataBase

This project used MongoDB as it`s database management system. For data storage was used a cloud database service provided by MongoDB, Atlas cloud (https://www.mongodb.com/docs/atlas/getting-started/).

For interaction with the database, a recommended choice is MongoDB Compass is a graphical user interface (GUI) tool provided by MongoDB to interact with MongoDB databases.









