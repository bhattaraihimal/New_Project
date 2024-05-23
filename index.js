import express, { json } from 'express';
import cors from "cors";
import bodyParser from "body-parser";

import { apiVersion, port, staticFolder } from "./config/config.js";
import apiRouter from "./routes/index.js";
import { connectToDB, sequelize } from "./utils/database.js";
import { verifyUserToken } from './controller/userController.js';

const app = express();

app.use(
    cors({
      origin: "*",
      methods: "GET, POST, PUT, PATCH, DELETE",
      credentials: true,
    })
  );
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(json());
  
  app.use(`${apiVersion}`, apiRouter);
  app.use(express.static(staticFolder));
  
  sequelize.sync();
  // sequelize.sync({ alter: true });
  
  app.get('/dashboard', verifyUserToken, (req, res) => {
    res.json({ message: 'Welcome to the dashboard' });
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to port 3001' });
});

// Start the server
app.listen(port, async () => {
    console.log(`Server is running on port: ${port}`);
    await connectToDB();
});

