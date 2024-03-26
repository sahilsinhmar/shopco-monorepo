import express from "express";
import { adminLogin, register, userLogin } from "../controllers/auth.js";

const router = express.Router();

router.route("/login").post(userLogin);
router.route("/login/admin").post(adminLogin);
router.route("/register").post(register);
export default router;
