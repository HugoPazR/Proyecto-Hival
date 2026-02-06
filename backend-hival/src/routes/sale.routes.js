import { Router } from "express";
import { createSale, getSales } from "../controllers/sale.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router.post("/", createSale);
router.get("/", getSales);

export default router;
