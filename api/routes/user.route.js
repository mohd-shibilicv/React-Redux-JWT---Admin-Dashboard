import express from "express";
import { deleteUser, deleteUserByAdmin, getAllUsers, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.delete('/admin/delete/:id', verifyToken, deleteUserByAdmin);
router.get("/all", verifyToken, getAllUsers);

export default router;
