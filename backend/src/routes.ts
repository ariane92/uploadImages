import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import Post from './models/Post';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/posts', upload.single('file'), async (request, response) => {
  const post = await Post.create({
    name: request.file.originalname,
    size: request.file.size,
    key: request.file.filename,
    url: '',
  });
  return response.json(post);
});
export default routes;
