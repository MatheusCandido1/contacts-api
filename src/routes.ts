import { Router } from 'express';

const apiv1 = require('./routes/v1');

import swaggerUi from "swagger-ui-express";

const swaggerDocument  = require('./swagger');

var swaggerOptions = {
  customSiteTitle: "MyContacts API - Swagger Docs"
}

const routes = Router();

//Swagger
routes.use('/', swaggerUi.serve);
routes.get('/', swaggerUi.setup(swaggerDocument, swaggerOptions));

// API V1
routes.use('/api/v1', apiv1);

export default routes;
