import router from "express";
import multer from "multer";
import uploadController from "../controllers/uploadController";
import authenticateJWT from "../middlewares/authenticateJWT";
import storage from "../utils/storage";

const uploadRouter = router();
const upload = multer({ storage });

uploadRouter.post(
	"/upload/profile",
	authenticateJWT,
	upload.single("profileImage"),
	uploadController.uploadProfileImage,
);

uploadRouter.post(
	"/upload/postimg/:postid",
	authenticateJWT,
	upload.single("postImage"),
	uploadController.uploadPostImage,
);

uploadRouter.post(
	"/upload/groupimg/:groupid",
	authenticateJWT,
	upload.single("groupImage"),
	uploadController.uploadGroupImage,
);

module.exports = uploadRouter;
