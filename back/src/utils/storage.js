const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
	destination: 'src/public/upload',
	filename: (req, file, callback) => {
		const imageFormat = file.mimetype.split('/')[1];
		let filename = `img_${uuidv4()}.${imageFormat}`;
		callback(null, filename);
	},
});

module.exports = storage;
