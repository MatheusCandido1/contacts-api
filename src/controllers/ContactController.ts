import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Contact from '../models/Contact';
import Category from '../models/Category';
import contactView from '../views/contactView';

interface ContactRequest {
  name: string,
  email: string,
  phone: string,
  [key: string]: any
}

export default {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;

    const contactsRepository = getRepository(Contact);

    if(!name || name == '') {
      return response.status(400).json({ error: 'Name is required'});
    }

    const contactExists = await contactsRepository.findOne({
      where: {email: email}
    });

    if(contactExists) {
      return response.status(400).json({ error: 'Contact already exists'});
    }

    const data: ContactRequest = {
      name,
      email,
      phone,
    };

    if(category_id) {
      const categoryRepository = getRepository(Category);

      const categoryExists = await categoryRepository.findOne({
        where: { id: category_id}
      });

      if(!categoryExists) {
        return response.status(404).json({ error: 'Category not found'});
      }

      data.category = category_id
    }

    const contact = contactsRepository.create(data);

    await contactsRepository.save(contact);

    return response.status(201).json({ message: 'Contact created' });
  },

  async index(request: Request, response: Response) {
    const contactsRepository = getRepository(Contact);
    let defaultOrder = 'asc';

    if(request.query.orderBy) {
      defaultOrder = request.query.orderBy.toString();
    }

    const contacts = await contactsRepository.find(
      { 
        order: {name: defaultOrder === "desc" ? 'DESC' : 'ASC',},
        relations: ['category'],
      },
    );

    return response.json(contactView.renderMany(contacts));
  },

  async show(request: Request, response: Response) {
    const { contactId } = request.params;
    const contactsRepository = getRepository(Contact);

    const contact = await contactsRepository.findOne(contactId, {
      relations: ['category'],
    });

    if(!contact) {
      return response.status(404).json({ error: 'Contact not found'});
    }

    return response.status(200).json(contactView.render(contact));
  },

  async update(request: Request, response: Response) {
    const { contactId } = request.params;
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body; 

    const contactsRepository = getRepository(Contact);

    const contactExists = await contactsRepository.findOne(contactId, {
      relations: ['category'],
    });


    if(!contactExists) {
      return response.status(404).json({ error: 'Contact not found'});
    }

    if(!name || name == '') {
      return response.status(400).json({ error: 'Name is required'});
    }

    const data: ContactRequest = {
      name,
      email,
      phone,
    };


    if(Boolean(!category_id)) {
      data.category = null
    } else {
        const categoryRepository = getRepository(Category);

        const categoryExists = await categoryRepository.findOne({
          where: { id: category_id}
        });

        if(!categoryExists) {
          return response.status(404).json({ error: 'Category not found'});
        }
        if(Boolean(!contactExists.category)) {
          data.category = category_id;
        } else {
          if(contactExists.category.id != category_id) {
            data.category = category_id;
          }
        }
    } 

    await contactsRepository.update(
      { id: contactId }, 
      data
    ); 

    return response.status(202).json({ message: 'Contact updated' });
  },
  
  async destroy(request: Request, response: Response) {
    const { contactId } = request.params;
    const contactsRepository = getRepository(Contact);

    const contact = await contactsRepository.findOne(contactId);

    if(!contact) {
      return response.status(404).json({ error: 'Contact not found'});
    }

    await contactsRepository.delete({id: contactId});

    return response.status(202).json({ message: 'Contact removed' });
  }
};
