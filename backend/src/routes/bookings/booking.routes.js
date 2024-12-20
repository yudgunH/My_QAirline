import express from "express";
import {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  cancelBooking,
  getBookings,
} from "../../controllers/bookings/booking.controller.js";
import {
  authenticateToken,
  checkAdminRole,
} from "../../middleware/Auth.middleware.js";

const router = express.Router();

router.get("/all", authenticateToken, checkAdminRole, getAllBookings);
router.get("/", authenticateToken, getBooking);
router.post("/new", authenticateToken, createBooking);
router.put("/cancel", authenticateToken, cancelBooking);
router.get("/list", getBookings);
// router.put("/update", authenticateToken, updateBooking);
// router.delete("/delete", authenticateToken, deleteBooking);

export default router;
