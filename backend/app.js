import express from "express";
import dalleroute from "./routes/dalleRoute.js";
import mongoDbConnect from "./mongoDbConnect.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/dalle", dalleroute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
  mongoDbConnect();
});
