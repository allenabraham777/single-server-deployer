import { Router } from "express";
import { getUserDetails, signin, signup } from "controllers/adminControllers";
import authMiddleware from "middlewares/authMiddleware";

const router = Router();

router.post("/signin", signin);

router.post("/signup", signup);

router.post("/user/details", authMiddleware, getUserDetails);

export default router;
