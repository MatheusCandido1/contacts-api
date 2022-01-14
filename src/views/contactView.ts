import Contact from '../models/Contact';
import categoryView from './categoryView';

export default {
    render(contact: Contact) {
        return {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            category: categoryView.render(contact.category),
        };
    },

    renderMany(contacts: Contact[]) {
        return contacts.map(contact => this.render(contact));
    }
};