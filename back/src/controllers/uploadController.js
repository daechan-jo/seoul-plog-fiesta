// const userService = require('./userService');
import uploadService from "../services/uploadService";
const fs = require("fs");
const path = require("path");

const uploadProfileImage = async (req, res, next) => {
	const userId = req.user.id;
	const imageFormat = req.file.mimetype.split("/")[1];
	const filename = `profile_${userId}.${imageFormat}`;

	try {
		const imagePath = path.join("../uploads/img", filename);
		fs.renameSync(req.file.path, imagePath);

		const newImage = await uploadService.uploadProfileImage(
			userId,
			imagePath,
		);

		res.status(201).json({
			message: "Profile image uploaded successfully",
			imageUrl: newImage.imageUrl,
		});
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = {
	uploadProfileImage,
};
