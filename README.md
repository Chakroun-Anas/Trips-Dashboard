## Description

This mini project is a demonstration of my skills as a full stack javascript developer, it's a web application that
consists of a frontend part developed with React.js and a backend part developed with Node.js (Typescript) while implementing a clean architecture.

## The Idea

A dashboard representing statistics of trips performed by a number of people to a various destinations.

## Frontend

The frontend part contains two pages:

1. Lock page: a password is required to access the dashboard (the password is PASS)
2. Dashboard: 5 widgets
   - Calendar: The ability to pick the day of the travels
   - Map: The destinations countries with the number of travels giving a selected day
   - Number of visitors by nationality given a country and a selected day
   - Visitors gender given a selected country and a selected day
   - Number of visitors by age group given a selected country and a selected day

## Backend

The backend expose multiple services while implementing a clean architecture, it consists of the following parts:

1. data: Input and Output data
2. domain: Domain entities and errors type definitions
3. infrastructure: Components that the application rely on in order to function (Persistance, Gateways, Mailing, etc)
4. rest: Controllers
5. usecase: Interactors that implements different bushiness rules

When running the backend, they are two choices, running the application using an in memory implementation or a database
implementation by toggling PERSISTANCE_TYPE variable in the .env file.

## Requirements

In order to run the application, the following elements are required:

- Node.js
- MongoDB (Optional)

## Run the application

### Run the backend

Execute the following commands:

- cd backend
- npm install
- npm run start

### Run the frontend

- cd frontend
- npm install
- npm start

## Demo

https://1drv.ms/v/s!AtTBMXTULHN3gwp9Zx4kz8Hpm7FR

## Screen shots

### Iphone 5/SE

![alt text](https://i.ibb.co/n6B1gKN/i-Phone-5-SE.png "Trips Dashboard - Iphone 5/SE")

### Pixel 2 XL

![alt text](https://i.ibb.co/cL0qnd5/Pixel-2-XL.png "Trips Dashboard - Pixel 2 XL")

### iPad

![alt text](https://i.ibb.co/qmHvPwJ/iPad.png "Trips Dashboard - Ipad")

### iPad Pro

![alt text](https://i.ibb.co/B4MqDvM/iPad-Pro.png "Trips Dashboard - iPad Pro")

### Laptop

![alt text](https://i.ibb.co/w7yVcdc/Laptop-with-Hi-DPI-screen.png "Trips Dashboard - Laptop")

## Keywords

- Frontend
- Backend
- Web application
- Responsive Design
- HTML
- CSS
- JavaScript
- React
- Node.js
- Express
- Mongoose
- REST API

[get an api key | maps javascript]: https://developers.google.com/maps/documentation/javascript/get-api-key
