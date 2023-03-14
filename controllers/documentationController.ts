import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import path from 'path';
import AppError from '../utils/appError';

const documentationPath = path.join(__dirname, '../documentation/endpoints.json');

export const getApiDocumentation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await (await fs.readFile(documentationPath)).toString();
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    console.log(err);
    next(new AppError('Could not get API Documentation', 500));
  }
};
