import { Router } from 'express';

import UserController from './controllers/UserController';
import CategoryController from './controllers/CategoryController';
import ContactController from './controllers/ContactController';

const routes = Router();

// Users
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/register', UserController.register);

// Category
routes.get('/categories', CategoryController.index);
routes.get('/categories/:id', CategoryController.show);

// Contacts
routes.get('/contacts', ContactController.index);
routes.get('/contacts/:id', ContactController.show);
routes.post('/contacts', ContactController.create);
routes.put('/contacts/:id', ContactController.update);
routes.delete('/contacts/:id', ContactController.destroy);

export default routes;
