## Description

This mini project is a demonstration of my skills as a full stack javascript developer, it's a web application that
consists of a frontend part developed with React and a backend part developed with Node.js

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

The backend applications consists of two main parts:

1. Database generator
2. Web services that the frontend application consumes

## Requirements:

In order to run the application, the following elements are required:

- Node.js
- MongoDB
- Google map API key: [Get an API Key | Maps JavaScript]

## Run the application

### Generate the database

Ensure that mongodb is installed locally and the database is accessible by the default port: 27017 then execute the following commands:

- cd backend
- npm install
- node database/generator.js

This will result on the creation of database called travels, a collection called travelers with 310000 documents.

### Run the backend

Execute the following commands:

- cd backend
- npm install
- node index.js

### Run the frontend

Set googleMapApiKey property in frontend/config.json then execute the following commands:

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
