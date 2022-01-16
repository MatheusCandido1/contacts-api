import { Router } from 'express';

const apiv1 = require('./routes/v1');

const swaggerUI = require('swagger-ui-express');
import { swaggerDocument } from './swagger';

const routes = Router();

//Swagger
routes.use('/', swaggerUI.serve);
routes.get('/', swaggerUI.setup(swaggerDocument));

// API V1
routes.use('/api/v1', apiv1);

export default routes;
