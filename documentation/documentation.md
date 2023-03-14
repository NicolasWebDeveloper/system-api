# API Documentation

## System

Endpoints for retrieving information about the system.

### /system/cpu

Endpoint for retrieving CPU data.

- **Method**: GET
- **Response**:
  - `brand`: CPU brand
  - `speed`: CPU speed

### /system/disk

Endpoint for retrieving disk data.

- **Method**: GET
- **Response**:
  - `totalSize`: Total disk size
  - `disks`: Array of disks with their respective name, size, and used space

### /system/memory

Endpoint for retrieving memory data.

- **Method**: GET
- **Response**:
  - `total`: Total memory
  - `free`: Free memory
  - `used`: Used memory

### /system/network

Endpoint for retrieving network interface data.

- **Method**: GET
- **Response**:
  - `interfaceCount`: Number of network interfaces

### /system/process

Endpoint for retrieving process data.

- **Method**: GET
- **Response**:
  - `all`: Total number of processes
  - `running`: Number of running processes
  - `blocked`: Number of blocked processes
  - `sleeping`: Number of sleeping processes
  - `unknown`: Number of processes with an unknown state

## Documentation

Endpoints for retrieving documentation about our API.

### /documentation/all

Endpoint for retrieving all API endpoints.

- **Method**: GET
- **Response**: All of our endpoints.
