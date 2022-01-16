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
const Category_1 = __importDefault(require("../models/Category"));
const categoryView_1 = __importDefault(require("../views/categoryView"));
exports.default = {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoriesRepository = (0, typeorm_1.getRepository)(Category_1.default);
            const categories = yield categoriesRepository.find();
            return response.json(categories);
        });
    },
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const categoriesRepository = (0, typeorm_1.getRepository)(Category_1.default);
            const category = yield categoriesRepository.findOne(id);
            if (!category) {
                return response.status(404).json({ error: 'Category not found' });
            }
            return response.status(200).json(categoryView_1.default.render(category));
        });
    },
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = request.body;
            const categoriesRepository = (0, typeorm_1.getRepository)(Category_1.default);
            if (!name || name == '') {
                return response.status(404).json({ error: 'Name is required' });
            }
            const data = {
                name,
            };
            const category = categoriesRepository.create(data);
            yield categoriesRepository.save(category);
            return response.status(201).json({ message: 'Category created' });
        });
    }
};
