import router from "express";
import multer from "multer";
import uploadController from "../controllers/uploadController";
import authenticateJWT from "../middlewares/authenticateJWT";
import storage from "../utils/storage";
const uploadRouter = router();
const upload = multer({ storage });

uploadRouter.post(
	"/upload/userimg",
	authenticateJWT,
	upload.single("profileImage"),
	uploadController.uploadProfileImage,
);

uploadRouter.post(
	"/group/postimg",
	authenticateJWT,
	upload.single("postImage"),
	uploadController.uploadPostImage,
);

module.exports = uploadRouter;
