import { Router } from 'express';

import CategoryController from '../../controllers/CategoryController';

const routes = Router();

// Category
routes.get('/', CategoryController.index);
routes.get('/:id', CategoryController.show);
routes.post('/', CategoryController.create);

module.exports = routes;
