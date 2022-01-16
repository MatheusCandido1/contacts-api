"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Contact_1 = __importDefault(require("../models/Contact"));
const Category_1 = __importDefault(require("../models/Category"));
const contactView_1 = __importDefault(require("../views/contactView"));
exports.default = {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const contactsRepository = (0, typeorm_1.getRepository)(Contact_1.default);
            let newOrder = 'asc';
            if (request.query.orderBy) {
                newOrder = request.query.orderBy.toString();
            }
            const contacts = yield contactsRepository.find({
                order: { name: newOrder === "desc" ? 'DESC' : 'ASC', },
                relations: ['category'],
            });
            return response.json(contactView_1.default.renderMany(contacts));
        });
    },
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const contactsRepository = (0, typeorm_1.getRepository)(Contact_1.default);
            const contact = yield contactsRepository.findOne(id, {
                relations: ['category'],
            });
            if (!contact) {
                return response.status(404).json({ error: 'Contact not found' });
            }
            return response.status(200).json(contactView_1.default.render(contact));
        });
    },
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone, category_id, } = request.body;
            const contactsRepository = (0, typeorm_1.getRepository)(Contact_1.default);
            if (!name || name == '') {
                return response.status(404).json({ error: 'Name is required' });
            }
            const contactExists = yield contactsRepository.findOne({
                where: { email: email }
            });
            if (contactExists) {
                return response.status(404).json({ error: 'Contact already exists' });
            }
            const data = {
                name,
                email,
                phone,
                category: category_id,
            };
            const contact = contactsRepository.create(data);
            yield contactsRepository.save(contact);
            return response.status(201).json({ message: 'Contact created' });
        });
    },
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { name, email, phone, category_id, } = request.body;
            const contactsRepository = (0, typeorm_1.getRepository)(Contact_1.default);
            const contactExists = yield contactsRepository.findOne(id);
            if (!contactExists) {
                return response.status(404).json({ error: 'Contact not found' });
            }
            if (!name || name == '') {
                return response.status(404).json({ error: 'Name is required' });
            }
            const categoryRepository = (0, typeorm_1.getRepository)(Category_1.default);
            const categoryExists = yield categoryRepository.findOne({
                where: { id: category_id }
            });
            if (!categoryExists) {
                return response.status(404).json({ error: 'Category not found' });
            }
            yield contactsRepository.update({
                id,
            }, {
                name: name,
                email: email,
                phone: phone,
                category: category_id
            });
            return response.status(202).json({ message: 'Contact updated' });
        });
    },
    destroy(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const contactsRepository = (0, typeorm_1.getRepository)(Contact_1.default);
            const contact = yield contactsRepository.findOne(id);
            if (!contact) {
                return response.status(404).json({ error: 'Contact not found' });
            }
            yield contactsRepository.delete({ id });
            return response.status(202).json({ message: 'Contact removed' });
        });
    }
};
