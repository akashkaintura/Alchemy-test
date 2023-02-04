Introduction
This project is a backend application that fetches news and weather data from various sources and sends it to the user's devices. The application provides weather information without authentication but requires authentication to access the news API. The application implements signup, login, and logout functionality for users.

Technologies
This project uses the following technologies:

Node.js
Nest.js
Jest for unit testing
Swagger for API documentation
Requirements
Node.js 10 or higher
npm 6 or higher


Access the API documentation at http://localhost:3000/api.
API Endpoints
The application provides the following API endpoints:

Signup

URL: /signup
Method: POST
Request Body:

{
  "email": "example@gmail.com",
  "password": "password",
  "name": "Example User"
}

Login
URL: /login
Method: POST
Request Body:
{
  "email": "example@gmail.com",
  "password": "password"
}

Logout

URL: /logout
Method: POST
News

URL: /news
Method: GET
Query Parameter: search (optional)
Weather

URL: /weather
Method: GET