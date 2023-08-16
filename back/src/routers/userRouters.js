import userController from "../controllers/userController";
import router from "express";

const userRouters = router();

userRouters.get("/", userController.getAllUsers);

module.exports = userRouters;
