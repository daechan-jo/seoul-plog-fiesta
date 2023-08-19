const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
// const path = require('path');

const storage = multer.diskStorage({
	destination: "uploads/images",
	filename: (req, file, callback) => {
		const imageFormat = file.mimetype.split("/")[1];
		let filename = `img_${uuidv4()}.${imageFormat}`;
		callback(null, filename);
	},
});

module.exports = storage;
