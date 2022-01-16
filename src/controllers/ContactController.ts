import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Contact from '../models/Contact';
import Category from '../models/Category';
import contactView from '../views/contactView';

export default {
  async index(request: Request, response: Response) {
    const contactsRepository = getRepository(Contact);
    let newOrder = 'asc';

    if(request.query.orderBy) {
      newOrder = request.query.orderBy.toString();
    }

    const contacts = await contactsRepository.find(
      { 
        order: {name: newOrder === "desc" ? 'DESC' : 'ASC',},
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

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;

    const contactsRepository = getRepository(Contact);

    if(!name || name == '') {
      return response.status(404).json({ error: 'Name is required'});
    }

    const contactExists = await contactsRepository.findOne({
      where: {email: email}
    });


    if(contactExists) {
      return response.status(404).json({ error: 'Contact already exists'});
    }
    
    const data = {
      name,
      email,
      phone,
      category: category_id,
    };

    const contact = contactsRepository.create(data);

    await contactsRepository.save(contact);

    return response.status(201).json({ message: 'Contact created' });
  },

  async update(request: Request, response: Response) {
    const { contactId } = request.params;
    const id = contactId
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body; 
    
    const contactsRepository = getRepository(Contact);

    const contactExists = await contactsRepository.findOne(id);


    if(!contactExists) {
      return response.status(404).json({ error: 'Contact not found'});
    }
    
    console.log(request.body)

    if(!name || name == '') {
      return response.status(404).json({ error: 'Name is required'});
    }
    
    console.log(name)

    const categoryRepository = getRepository(Category);

    const categoryExists = await categoryRepository.findOne({
      where: { id: category_id}
    });

    if(!categoryExists) {
      return response.status(404).json({ error: 'Category not found'});
    }


    await contactsRepository.update({
      id,
    }, {
      name:name,
      email:email,
      phone:phone,
      category: category_id
    });

    return response.status(202).json({ message: 'Contact updated' });
  },
  
  async destroy(request: Request, response: Response) {
    const { contactId } = request.params;
    const id = contactId
    const contactsRepository = getRepository(Contact);

    const contact = await contactsRepository.findOne(id);

    if(!contact) {
      return response.status(404).json({ error: 'Contact not found'});
    }

    await contactsRepository.delete({id});

    return response.status(202).json({ message: 'Contact removed' });
  }
};
