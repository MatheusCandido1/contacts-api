import { Router } from 'express';

import CategoryController from '../../controllers/CategoryController';

const routes = Router();

// Category
routes.get('/', CategoryController.index);
routes.get('/:categoryId', CategoryController.show);
routes.post('/', CategoryController.create);

module.exports = routes;
