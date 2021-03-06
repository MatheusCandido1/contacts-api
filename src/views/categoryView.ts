import Category from '../models/Category';

export default {
    render(category: Category) {
        if(!category) {
            return null;
        }
        return {
            id: category.id,
            name:category.name,
        };
    },
    renderMany(categories: Category[]) {
        return categories.map(category => this.render(category));
    }
};