import express from "express";
const router = express.Router();
import {
  createITRFormType,
  deleteITRFormType,
  getITRFormTypes,
  getITRFormType,
  updateITRFormType,
} from "../controllers/itrFormTypeController.js";

router.get("/", getITRFormTypes);

router.post("/new", createITRFormType);

router.get("/:id", getITRFormType);

router.put("/:id", updateITRFormType);

router.delete("/:id", deleteITRFormType);

export default router;
