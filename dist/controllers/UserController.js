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
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    register(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = (0, typeorm_1.getRepository)(User_1.default);
            const { name, email, password } = request.body;
            const userExists = yield repository.findOne({ where: { email } });
            if (userExists) {
                return response.sendStatus(409);
            }
            const user = repository.create({ name, email, password });
            yield repository.save(user);
            return response.status(200).json(user);
        });
    },
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersRepository = (0, typeorm_1.getRepository)(User_1.default);
            const users = yield usersRepository.find();
            return response.json(users);
        });
    },
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const usersRepository = (0, typeorm_1.getRepository)(User_1.default);
            const user = yield usersRepository.findOne(id);
            return response.json(user);
        });
    },
};
