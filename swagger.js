const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Car Collection API",
    description: "API for managing a car collection"
  },
  host: "localhost:3000",
  schemes: ["http"]
};

const outputFile = "./swagger.json";
const routes = ["./server.js"];

swaggerAutogen(outputFile, routes, doc);