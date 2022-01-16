import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Category from '../models/Category';
import categoryView from '../views/categoryView';

export default {
  async index(request: Request, response: Response) {
    const categoriesRepository = getRepository(Category);

    const categories = await categoriesRepository.find();

    return response.json(categories);
  },

  async show(request: Request, response: Response) {
    const { categoryId } = request.params;
    const id = categoryId
    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.findOne(id);

    if(!category) {
      return response.status(404).json({ error: 'Category not found'});
    }

    return response.status(200).json(categoryView.render(category));
  },

  async create(request: Request, response: Response) {
    const { name } = request.body;
    
    const categoriesRepository = getRepository(Category);

    if(!name || name == '') {
      return response.status(404).json({ error: 'Name is required'});
    }

    const data = {
      name,
    }

    const category = categoriesRepository.create(data);

    await categoriesRepository.save(category);

    return response.status(201).json({ message: 'Category created' });
  }
};
