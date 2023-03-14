import * as si from 'systeminformation';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

export const getCPUInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cpuInfo = await si.cpu();
    res.status(200).json({
      brand: cpuInfo.brand,
      speed: cpuInfo.speed,
    });
  } catch (err) {
    next(new AppError('Could not get CPU Information', 500));
  }
};

export const getMemoryInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const memoryInfo = await si.mem();
    res.status(200).json({
      total: memoryInfo.total / 1000000000,
      free: memoryInfo.free / 1000000000,
      used: memoryInfo.used / 1000000000,
    });
  } catch (err) {
    next(new AppError('Could not get Memory Information', 500));
  }
};

export const getDiskInformation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const hardDiskInformation = await si.diskLayout();
    const totalSize = hardDiskInformation.reduce((acc, cur) => acc + cur.size, 0) / 1000000000;
    res.status(200).json({ totalSize, disks: hardDiskInformation.length });
  } catch (err) {
    next(new AppError('Could not get Disk Informations', 500));
  }
};

export const getProcessInformation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const processInfo = await si.processes();
    res
      .status(200)
      .json({
        all: processInfo.all,
        running: processInfo.running,
        blocked: processInfo.blocked,
        sleeping: processInfo.sleeping,
        unknown: processInfo.unknown,
      });
  } catch (err) {
    next(new AppError('Could not get Process Information', 500));
  }
};
