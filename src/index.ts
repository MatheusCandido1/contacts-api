import express from 'express';

import 'express-async-errors';
import './database/connection';

import cors from 'cors';
import routes from './routes';
import error from './middlewares/error';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(error);

app.listen(process.env.PORT || 3000);
