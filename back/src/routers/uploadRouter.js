import router from "express";
import multer from "multer";
import uploadController from "../controllers/uploadController";
const uploadRouter = router.Router();
const upload = multer({ dest: "../uploads/img" });

uploadRouter.post(
	"/upload/userimg",
	upload.single("profileImage"),
	uploadController.uploadProfileImage,
);
