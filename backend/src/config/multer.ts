import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename(request, file, cb) {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),

  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: (request, file, cb) => {
    const allowdMimes = ['image/jpeg', 'image/png', 'image/pjpeg', 'image/gif'];

    if (allowdMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid format.'));
    }
  },
};
