"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("./controllers/UserController"));
const CategoryController_1 = __importDefault(require("./controllers/CategoryController"));
const ContactController_1 = __importDefault(require("./controllers/ContactController"));
const routes = (0, express_1.Router)();
// Users
routes.get('/users', UserController_1.default.index);
routes.get('/users/:id', UserController_1.default.show);
routes.post('/register', UserController_1.default.register);
// Category
routes.get('/categories', CategoryController_1.default.index);
routes.get('/categories/:id', CategoryController_1.default.show);
routes.post('/categories', CategoryController_1.default.create);
// Contacts
routes.get('/contacts', ContactController_1.default.index);
routes.get('/contacts/:id', ContactController_1.default.show);
routes.post('/contacts', ContactController_1.default.create);
routes.put('/contacts/:id', ContactController_1.default.update);
routes.delete('/contacts/:id', ContactController_1.default.destroy);
exports.default = routes;
