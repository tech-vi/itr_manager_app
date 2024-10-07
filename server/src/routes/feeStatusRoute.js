import express from "express";
const router = express.Router();
import {
  createFeeStatus,
  deleteFeeStatus,
  getFeeStatuses,
  getFeeStatus,
  updateFeeStatus,
} from "../controllers/feeStatusController.js";

router.get("/", getFeeStatuses);

router.post("/new", createFeeStatus);

router.get("/:id", getFeeStatus);

router.put("/:id", updateFeeStatus);

router.delete("/:id", deleteFeeStatus);

export default router;
