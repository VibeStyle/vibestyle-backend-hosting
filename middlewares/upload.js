const multer = require('multer');
const path = require('path');

const allowedMimeTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/pdf',
  'application/msword',
  'application/zip',
  'image/svg+xml',
];

const tmpDir = path.join(__dirname, '../../', 'tmp');

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // const { _id } = req.user;
    // const ext = path.extname(file.originalname);
    // cb(null, `${_id}${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    // console.log(file.mimetype);
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Only upload the following file formats: jpeg, png, pdf, doc, svg',
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: multerFilter,
  limits: { fileSize: 1024 * 1024 * 20 },
});

module.exports = upload;
