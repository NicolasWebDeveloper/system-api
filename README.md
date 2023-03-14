# System API

This API provides endpoints for retrieving information about the system, such as CPU data, disk data, memory data, network interface data, and process data.

## Endpoints

### `GET /system/cpu`

Returns CPU data.

#### Response

- `brand`: CPU brand
- `speed`: CPU speed

### `GET /system/disk`

Returns disk data.

#### Response

- `totalSize`: Total disk size
- `disks`: Array of disks with their respective name, size, and used space

### `GET /system/memory`

Returns memory data.

#### Response

- `total`: Total memory
- `free`: Free memory
- `used`: Used memory

### `GET /system/network`

Returns network interface data.

#### Response

- `interfaceCount`: Number of network interfaces

### `GET /system/process`

Returns process data.

#### Response

- `all`: Total number of processes
- `running`: Number of running processes
- `blocked`: Number of blocked processes
- `sleeping`: Number of sleeping processes
- `unknown`: Number of processes in unknown state
