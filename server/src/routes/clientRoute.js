import express from "express";
import {
  getClients,
  addClient,
  getClient,
  editClient,
  removeClient,
} from "../controllers/clientController.js";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getClients);

router.post("/", verifyJwtToken, addClient);

router.put("/:cid", verifyJwtToken, editClient);

router.get("/:cid", getClient);

router.delete("/:cid", removeClient);

export default router;
