import { Request, Response, NextFunction } from 'express';

import AppError from '../utils/appError';

export default (err: AppError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).json({ statusCode: err.statusCode, status: err.status, message: err.message });
};
