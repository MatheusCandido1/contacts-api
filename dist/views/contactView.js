"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryView_1 = __importDefault(require("./categoryView"));
exports.default = {
    render(contact) {
        return {
            id: contact.id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            category: categoryView_1.default.render(contact.category),
        };
    },
    renderMany(contacts) {
        return contacts.map(contact => this.render(contact));
    }
};
