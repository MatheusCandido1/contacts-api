import { Router } from 'express';

const apiv1 = require('./routes/v1');

import swaggerUi from "swagger-ui-express";
import YAML from 'yamljs';

var path = require('path');
var swagger_path =  path.resolve(__dirname,'./swagger.yaml');
const swaggerDocument = YAML.load(swagger_path);


const routes = Router();

//Swagger
routes.use('/', swaggerUi.serve);
routes.get('/', swaggerUi.setup(swaggerDocument));
// API V1
routes.use('/api/v1', apiv1);

export default routes;
