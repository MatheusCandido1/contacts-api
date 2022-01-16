"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, request, response, next) => {
    return response.sendStatus(500);
};
exports.default = errorHandler;
