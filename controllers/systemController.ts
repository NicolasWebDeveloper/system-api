import * as si from 'systeminformation';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

let cpuInfo: si.Systeminformation.CpuData;
let memoryInfo: si.Systeminformation.MemData;
let hardDiskInfo: si.Systeminformation.DiskLayoutData[];
let processInfo: si.Systeminformation.ProcessesData;
let networkInfo: si.Systeminformation.NetworkInterfacesData | si.Systeminformation.NetworkInterfacesData[];
let osInfo: si.Systeminformation.OsData;
let lastUpdate: number;

let isReady = false;

const refreshData = async () => {
  console.log('Starting to Update Data!');
  const tempCpuData = await si.cpu();
  const tempMemoryInfo = await si.mem();
  const tempHardDiskInfo = await si.diskLayout();
  const tempProcessInfo = await si.processes();
  const tempNetworkInfo = await si.networkInterfaces();
  const tempOsInfo = await si.osInfo();

  cpuInfo = tempCpuData;
  memoryInfo = tempMemoryInfo;
  hardDiskInfo = tempHardDiskInfo;
  processInfo = tempProcessInfo;
  networkInfo = tempNetworkInfo;
  osInfo = tempOsInfo;

  if (!isReady) isReady = true;
  lastUpdate = new Date().getTime();
  console.log('Finished to update Data!');
};

refreshData();
setInterval(() => {
  refreshData();
}, 1000 * 30);

export const apiIsReady = (req: Request, res: Response, next: NextFunction) => {
  if (isReady) {
    next();
  } else {
    next(new AppError('Server is starting up', 500));
  }
};

export const getCPUInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({
      lastUpdate,
      brand: cpuInfo.brand,
      speed: cpuInfo.speed,
    });
  } catch (err) {
    next(new AppError('Could not get CPU Information', 500));
  }
};

export const getMemoryInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({
      lastUpdate,
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
    const totalSize = hardDiskInfo.reduce((acc, cur) => acc + cur.size, 0) / 1000000000;
    res.status(200).json({ lastUpdate, totalSize, disks: hardDiskInfo.length });
  } catch (err) {
    next(new AppError('Could not get Disk Informations', 500));
  }
};

export const getProcessInformation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({
      lastUpdate,
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

export const getNetworkInformation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Array.isArray(networkInfo)) {
      res.status(200).json({ lastUpdate, interfaceCount: networkInfo.length });
    } else {
      res.status(200).json({ lastUpdate, interfaceCount: 1 });
    }
  } catch (err) {
    next(new AppError('Could not get Network Information', 500));
  }
};

export const getAllInformations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalSize = hardDiskInfo.reduce((acc, cur) => acc + cur.size, 0) / 1000000000;
    res.status(200).json({
      lastUpdate,
      cpu: {
        brand: cpuInfo.brand,
        speed: cpuInfo.speed,
      },
      memory: {
        total: memoryInfo.total / 1000000000,
        free: memoryInfo.free / 1000000000,
        used: memoryInfo.used / 1000000000,
      },
      disk: {
        totalSize,
        disks: hardDiskInfo.length,
      },
      process: {
        all: processInfo.all,
        running: processInfo.running,
        blocked: processInfo.blocked,
        sleeping: processInfo.sleeping,
        unknown: processInfo.unknown,
      },
      osInfo: {
        platform: osInfo.platform,
        distro: osInfo.distro,
        hostname: osInfo.hostname,
      },
    });
  } catch (err) {
    next(new AppError('Could not get All Informations', 500));
  }
};
