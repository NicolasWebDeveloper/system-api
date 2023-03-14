import { Request, Response, NextFunction } from 'express';
import config from '../config';

import AppError from '../utils/appError';

export default (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'fail';
  const message = config.production ? 'An error occured' : err.message;
  res.status(err.statusCode).json({ statusCode, status, message });
};
