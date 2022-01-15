import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  return response.sendStatus(500);
};

export default errorHandler;
