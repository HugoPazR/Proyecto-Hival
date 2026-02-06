import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/private", protect, (req, res) => {
  res.json({
    message: "Acceso autorizado",
    user: req.user
  });
});

export default router;
