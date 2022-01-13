import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Contact from '../models/Contact';

export default {
  async index(request: Request, response: Response) {
    const contactsRepository = getRepository(Contact);

    const contacts = await contactsRepository.find({ relations: ['category'] });

    return response.json(contacts);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const contactsRepository = getRepository(Contact);

    const contact = await contactsRepository.findOne(id);

    return response.json(contact);
  },
};
