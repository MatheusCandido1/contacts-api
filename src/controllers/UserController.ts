import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

export default {
  async register(request: Request, response: Response) {
    const repository = getRepository(User);
    const { name, email, password } = request.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return response.sendStatus(409);
    }

    const user = repository.create({ name, email, password });
    await repository.save(user);

    return response.status(200).json(user);
  },

  async index(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return response.json(users);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    return response.json(user);
  },
};
