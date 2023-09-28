import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded } from "express";
import { connectToDatabase } from "./db/connect";

const app = express();




app.use(urlencoded({ extended: true }));
app.use(json());


// swagger UI
import * as swaggerUI from "swagger-ui-express";
import * as swaggerJson from "./tsoa/tsoa.json";

// serve Swagger UI

app.use(
  ["/openapi", "/docs", "/swagger"],
  swaggerUI.serve,
  swaggerUI.setup(swaggerJson)
);

// serve swagger JSON

app.get("/swagger.json", (_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerJson);
});
// previous implementation for app.js

// tsoa routes

import { RegisterRoutes } from "./routes/routes";
RegisterRoutes(app);

// error handler
import { errorHandlerMiddleware } from "./middleware/error-handler";
app.use(errorHandlerMiddleware);

// port and start functions go here
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is missign in .env file");
    }
    console.log("Connecting to database...");
    await connectToDatabase(mongoUri);
    console.log("Connected to database");
    console.log("Starting server...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();