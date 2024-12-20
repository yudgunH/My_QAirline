import express from "express";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
  changePassword,
} from "../../controllers/users/Customer.controller.js";
import {
  authenticateToken,
  authenticateTokenWithoutCache,
  checkAdminRole,
} from "../../middleware/Auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, getCustomer);
router.get("/profile", authenticateToken, getCustomer);
router.get("/all", authenticateToken, checkAdminRole, getAllCustomers);
router.post("/new", createCustomer);
router.put("/update", authenticateToken, updateCustomer);
router.delete("/delete", authenticateToken, deleteCustomer);
router.put("/change-password", authenticateToken, changePassword);

export default router;
