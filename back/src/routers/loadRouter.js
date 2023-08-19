import authenticateJWT from "../middlewares/authenticateJWT";
import router from "express";
import * as path from "path";
const loadRouter = router();
import express from "express";
import loadController from "../controllers/loadController";

loadRouter.get(
	"/profile/image",
	authenticateJWT,
	loadController.loadProfileImage,
);

loadRouter.get(
	"/postimg/:postid",
	express.static(path.join(__dirname, "uploads/images")),
	authenticateJWT,
	loadController.loadPostImage,
);

module.exports = loadRouter;
