import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import Post from './models/Post';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/posts', upload.single('file'), async (request, response) => {
  const { originalname: name, size, filename: key } = request.file;
  const post = await Post.create({
    name,
    size,
    key,
    url: '',
  });
  return response.json(post);
});
export default routes;
