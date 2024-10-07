import express from "express";
const router = express.Router();
import {
  createITRFormStatus,
  deleteITRFormStatus,
  getITRFormStatuses,
  getITRFormStatus,
  updateITRFormStatus,
} from "../controllers/itrFormStatusController.js";

router.get("/", getITRFormStatuses);

router.post("/new", createITRFormStatus);

router.get("/:id", getITRFormStatus);

router.put("/:id", updateITRFormStatus);

router.delete("/:id", deleteITRFormStatus);

export default router;