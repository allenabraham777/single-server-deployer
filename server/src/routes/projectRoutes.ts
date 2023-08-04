import { Router } from "express";
import { create } from "controllers/projectControllers";
import authMiddleware from "middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, create);

export default router;
