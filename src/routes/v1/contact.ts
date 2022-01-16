import { Router } from 'express';

import ContactController from '../../controllers/ContactController';

const routes = Router();

// Category
routes.get('/', ContactController.index);
routes.get('/:contactId', ContactController.show);
routes.post('/', ContactController.create);
routes.put('/:contactId', ContactController.update);
routes.delete('/:contactId', ContactController.destroy);

module.exports = routes;
