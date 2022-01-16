"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(category) {
        if (!category) {
            return null;
        }
        return {
            id: category.id,
            name: category.name,
        };
    },
    renderMany(categories) {
        return categories.map(category => this.render(category));
    }
};
