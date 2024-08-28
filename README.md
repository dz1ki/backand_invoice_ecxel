## Description

Report generation service. Divided into 2 microservices web-api and worker-excel.  
Web-api receives data, stores and sends data for generation. Worker-excel is responsible  
for generating and saving the file in the cloud. Communication via queues and Http requests.  
User data, links to documents, and the state are stored in the web-api microservice database.  
setTimeout() for 20 seconds has been added to the file generation function for clarity of work.  
Using the generateInvoice route, we send a request to generate a document. At the same time,  
we create the document state. Using the invoices route, we check the state of our document:  
"loading", "processing", "complete" when the document is ready, together with the state there  
will be a link to the document. The document itself is stored in the cloud.

1. Platform for creating a service - Node.js.
2. Framework - NestJS and express.
3. ORM - sequelize typescript.
4. PostgreSQL as database server.
5. bullMQ is used for queues.
6. Swagger documentation.
7. To create images and organize work with Redis, PostgreSQL uses Docker-compose.

## Running the app

```bash

# you need to add a local.json file with passwords to the web-api/config and worker-excel/config folders.

# In the new terminal go to the web-api directory.
$ cd web-api

# In the console, run the build and launch images with the command:
$ docker-compose up

# Install dependencies.
$ npm install

# Create tables in the database using the "migrations" command:
$ npm run migrate:run

# Fill in the tables with the data "seeders" with the command:
$ npm run seed:run

# Start the server
$ npm run start

# In the new terminal go to the worker-pdf directory.
$ cd worker-excel

# Install dependencies.
$ npm install

# Run worker-excel microservice.
$ npm run start

```

## Test

Documentation (Swagger UI) is available at: [link] http://localhost:3000/api-docs/

node v20.13.1
