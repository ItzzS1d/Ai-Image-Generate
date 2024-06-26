import express from "express";
import { createDalle, getAllDalle } from "../controllers/dalleController.js";

const router = express.Router();

router.post("/create", createDalle);
router.get("/allDalles", getAllDalle);

export default router;
