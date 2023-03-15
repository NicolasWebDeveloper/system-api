import * as dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.listen(3000, () => console.log('App listening on Port 3000'));
