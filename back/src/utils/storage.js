const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/images'),
  filename: (req, file, callback) => {
    const imageFormat = file.mimetype.split('/')[1];
    const filename = `img_${uuidv4()}.${imageFormat}`;
    callback(null, filename);
  },
});

export default storage;
