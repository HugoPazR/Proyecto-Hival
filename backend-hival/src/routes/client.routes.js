import { Router } from "express";
import { createClient, getClients } from "../controllers/client.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router.post("/", createClient);
router.get("/", getClients);

export default router;
