import express from "express";
import profileController from "./controllers/profileController.js";
import { loginUser } from "./controllers/authController.js";
import { initializeFirestore } from "./db/index.js";
import "dotenv/config";

// initializeFirestore();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/profile", profileController.getUsers);
app.post("/profile", profileController.registerUser);
app.post("/login", loginUser);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 8080");
});
