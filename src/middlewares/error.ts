import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  return response.status(500).json({ error });
};

export default errorHandler;
