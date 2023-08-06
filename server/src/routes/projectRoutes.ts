import { Router } from "express";
import {
  create,
  getAll,
  getById,
  redeploy,
  stop,
  update,
} from "controllers/projectControllers";
import authMiddleware from "middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, create);
router.get("/all", authMiddleware, getAll);
router.get("/:projectId", authMiddleware, getById);
router.put("/:projectId", authMiddleware, update);
router.get("/:projectId/redeploy", authMiddleware, redeploy);
router.get("/:projectId/stop", authMiddleware, stop);

export default router;
