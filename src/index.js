import express from "express";
import { initializeFirestore } from "./db/index.js";
import "dotenv/config";
import router from "./routes/index.js";

// initializeFirestore();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
