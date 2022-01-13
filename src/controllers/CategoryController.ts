import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Category from '../models/Category';

export default {
  async index(request: Request, response: Response) {
    const categoriesRepository = getRepository(Category);

    const categories = await categoriesRepository.find({ relations: ['contacts'] });

    return response.json(categories);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.findOne(id);

    return response.json(category);
  },
};
