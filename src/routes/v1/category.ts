import { Router } from 'express';

import CategoryController from '../../controllers/CategoryController';

const routes = Router();

// Category
routes.post('/', CategoryController.create);
routes.get('/', CategoryController.index);
routes.get('/:categoryId', CategoryController.show);
routes.put('/:categoryId', CategoryController.update);
routes.delete('/:categoryId', CategoryController.destroy);



module.exports = routes;
