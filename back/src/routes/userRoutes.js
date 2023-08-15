import userController from "../controllers/userController";
import router from "express";

const userRoutes = router();

userRoutes.get("/", userController.getAllUsers);

module.exports = userRoutes;
