import { Router } from "express";
import {
  getClients,
  createClient
} from "../controllers/client.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);
router.get("/", getClients);
router.post("/", createClient);

export default router;
