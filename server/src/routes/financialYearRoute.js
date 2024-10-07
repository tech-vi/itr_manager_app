import express from "express";
const router = express.Router();
import {
  createFinancialYear,
  deleteFinancialYear,
  getFinancialYears,
  getFinancialYear,
  updateFinancialYear,
} from "../controllers/financialYearController.js";

router.get("/", getFinancialYears);

router.post("/new", createFinancialYear);

router.get("/:id", getFinancialYear);

router.put("/:id", updateFinancialYear);

router.delete("/:id", deleteFinancialYear);

export default router;
