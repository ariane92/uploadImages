import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import routes from './routes';

mongoose.connect('mongodb://localhost:27017/upload', {
  useNewUrlParser: true,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
