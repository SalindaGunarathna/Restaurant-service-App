# Restaurant API
A RESTful API for managing restaurant information with user authentication and authorization using JWT web tokens.

## Overview
This project allows creating, updating, retrieving, and deleting restaurant details. It follows SOLID principles and includes proper validation using middleware functions. Unit tests are implemented using Jest to ensure the reliability of the codebase.

## Features

* Creating a new restaurant
* Retrieving restaurant details by ID
* Updating restaurant information by ID
* Deleting a restaurant by ID
* Listing all restaurants
* User management: sign up, login, logout, and perform admin operations
* Validation: proper validation is implemented using middleware functions to ensure data integrity
* Authentication and Authorization: JWT web tokens are used for user authentication and authorization
* Dockerization: the project includes Dockerfile and docker-compose.yml files for easy deployment
* Unit Testing: unit tests are implemented using Jest to validate functionality and ensure code quality
* Docker Image: Docker image can be built and run to deploy the application in a containerized environment

## Installation

1. Clone the repository from GitHub.
2. Ensure you have Node.js and npm installed on your machine.
3. Install dependencies by running `npm install`.
4. Configure environment variables for the database connection, JWT secret, etc., in a `.env` file.

## Usage

1. Start the server by running `npm start`.
2. Access the API endpoints using a tool like Postman or curl.

## Testing

1. Run unit tests using `npm test`.
2. Ensure all test cases pass successfully.

## Docker Deployment

1. Build the Docker image using `docker build -t restaurant-service..`
2. Run the Docker container using `docker run -p 4000:4000 restaurant-service`
3. Access the API endpoints at `http://localhost:4000`

## Sample Requests

### Create Restaurant

* Endpoint: `POST /restaurants`
* Body: `{ "name": "Restaurant Name", "address": "Restaurant Address", "telephone": "Restaurant Telephone",}`
* image should send in header as file
* image acces in out side from `http://localhost:4000/public/file/image.png`

### Retrieve Restaurant by ID

* Endpoint: `GET /[restaurants/:i](http://localhost:4000/api/restaurant/retrieve/id`

### Update Restaurant by ID

* Endpoint: `PUT /restaurants/:id`
* Body: `{ "name": "Updated Restaurant Name", "address": "Updated Restaurant Address", "telephone": "Updated Restaurant Telephone", "image": "Updated Restaurant Image URL" }`

### Delete Restaurant by ID

* Endpoint: `DELETE /restaurants/:id`

### List All Restaurants

* Endpoint: `GET /restaurants`

### User Signup

* Endpoint: `POST /auth/signup`
* Body: `{ "email": "user@example.com", "password": "password" }`

### User Login

* Endpoint: `POST /auth/login`
* Body: `{ "email": "user@example.com", "password": "password" }`

### User Logout

* Endpoint: `POST /auth/logout`

### Admin Operations

* Admin operations can be performed by users with appropriate permissions.

## Contributors

* [Salinda Gunarathna ](https://github.com/SalindaGunarathna)
