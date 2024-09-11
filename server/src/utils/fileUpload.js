const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '..', '..', '..', 'public/images');

const filePath = env === 'production' ? '/var/www/html/images/' : devFilePath;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storageContestFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, filePath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadAvatars = multer({ storage: storageContestFiles }).single('file');
const uploadContestFiles = multer({ storage: storageContestFiles }).array(
  'files',
  3
);
const updateContestFile = multer({ storage: storageContestFiles }).single(
  'file'
);
const uploadLogoFiles = multer({ storage: storageContestFiles }).single(
  'offerData'
);

module.exports.uploadAvatar = (req, res, next) => {
  uploadAvatars(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(createError(500, 'Multer error'));
    } else if (err) {
      return next(createError(500, err));
    }
    next();
  });
};

module.exports.uploadContestFiles = (req, res, next) => {
  uploadContestFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(createError(500, 'Multer error'));
    } else if (err) {
      return next(createError(500, err));
    }
    next();
  });
};

module.exports.updateContestFile = (req, res, next) => {
  updateContestFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(createError(500, 'Multer error'));
    } else if (err) {
      return next(createError(500, err));
    }
    next();
  });
};

module.exports.uploadLogoFiles = (req, res, next) => {
  uploadLogoFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(createError(500, 'Multer error'));
    } else if (err) {
      return next(createError(500, err));
    }
    next();
  });
};
