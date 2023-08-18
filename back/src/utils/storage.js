import multer from "multer";
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
	destination: "./uploads/images",
	filename: (req, file, callback) => {
		const userId = req.user.id; // Assuming you extract user ID from the authenticated user
		const imageFormat = file.mimetype.split("/")[1];
		const filename = `img_${uuidv4()}.${imageFormat}`;
		callback(null, filename);
	},
});

module.exports = storage;
