import { Router } from 'express';

import ContactController from '../../controllers/ContactController';

const routes = Router();

// Category
routes.get('/', ContactController.index);
routes.get('/:id', ContactController.show);
routes.post('/', ContactController.create);
routes.put('/:id', ContactController.update);
routes.delete('/:id', ContactController.destroy);

module.exports = routes;
