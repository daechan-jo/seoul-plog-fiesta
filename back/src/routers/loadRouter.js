import authenticateJWT from "../middlewares/authenticateJWT";
import router from "express";
import * as path from "path";
const loadRouter = router();
import express from "express";
import loadController from "../controllers/loadController";

loadRouter.get(
	"/profile/image",
	express.static(path.join(__dirname, "uploads/images")),
	authenticateJWT,
	loadController.loadProfileImage,
);

loadRouter.get(
	"/postimg/:postid",
	express.static(path.join(__dirname, "uploads/images")),
	authenticateJWT,
	loadController.loadPostImage,
);

loadRouter.get(
	"/groupimg/:groupid",
	express.static(path.join(__dirname, "uploads/images")),
	authenticateJWT,
	loadController.loadGroupImage,
);

module.exports = loadRouter;
