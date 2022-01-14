import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import * as Yup from 'yup';
import Contact from '../models/Contact';
import contactView from '../views/contactView';

export default {
  async index(request: Request, response: Response) {
    const contactsRepository = getRepository(Contact);

    const contacts = await contactsRepository.find({ relations: ['category'] });

    return response.json(contactView.renderMany(contacts));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const contactsRepository = getRepository(Contact);

    const contact = await contactsRepository.findOne(id);

    return response.json(contact);
  },

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      phone,
      category_id,
    } = request.body;

    const contactsRepository = getRepository(Contact);

    const data = {
      name,
      email,
      phone,
      category_id,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const contact = contactsRepository.create(data);

    await contactsRepository.save(contact);

    return response.status(201).json({ message: 'Contact created!' });
  },
};
