import { Router } from 'express';

import UserController from '../../controllers/UserController';

const routes = Router();

routes.get('/', UserController.index);
routes.get('/:userId', UserController.show);
routes.post('/', UserController.register);


module.exports = routes;
