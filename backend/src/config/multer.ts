import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const storageTypes = {
  local: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (request, file, cb) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),

  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'upload92',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request, file, cb) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      console.log(fileName);

      return cb(null, fileName);
    },
  }),
};
export default {
  storage: storageTypes.s3,

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
