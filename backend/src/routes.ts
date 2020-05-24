import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/posts', upload.single('file'), (request, response) => {
  console.log(request.file);
  return response.json({ message: 'Olá Ariane' });
});
export default routes;
