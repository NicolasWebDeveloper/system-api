import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import mysql from 'mysql2';

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_DATABASE);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    next(new AppError('Authentication error', 500));
  }
};
