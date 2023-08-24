# Base Operations Challenge

Below is a description of the technical challenge for the Base Operations Full Stack Developer position opening. The intention of this exercise is to get a feel for how you might approach a real world development problem, observe your coding structure and style, and evaluate your working knowledge of development within a Node + React environment.

The core exercise is to build a set of basic services to:
ingest user information, including their location, and persist them to the database,
query the database to get a list of users within a specified radius of a given lat/lon location.
Please use Express.js and React.js for your backend and frontend service environments.

Please use PostGIS for your database. For this exercise, write your database transaction code directly in javascript without the addition of a framework designed for that purpose.

## Backend

The backend was built using NestJS with TypeORM connected to a PostgreSQL database with PostGIS extension to handle geometry based queries.

To start the server run the following command in the backend folder

```
npm run start:dev
```

This will start the webserver on PORT 8000 exposing the following endpoints:

```
GET /place?longitude=-122.4194&latitude=37.778&radius=1000 HTTP/1.1
Host: localhost:8000
```

This will return a list of records from the database within the radius specified in meters from the point specified by the latitude and logintude parameters

```
POST /place HTTP/1.1
Host: localhost:8000
Content-Type: application/json
Content-Length: 78

{
  "name": "New Place",
  "address": "3215 Wellington Ct, Raleigh, NC 27615, USA",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

This will add a new record to the database with the specified parameters

## Frontend

The frontend was built using NextJS and React.It also uses Google Places Autocomplete API to handle geocoding from a real US address to latitude and longitude.

To start the server run the following command in the frontend folder:

```
npm run dev
```

This will start the development server on PORT 3000. It only has a root route with a form to add new entries, wehere you can search an address or enter manually the latitude and longitude.

It also presents a search form where you can enter an address or latitude, longitude and radius and it will return a list of found locations.
