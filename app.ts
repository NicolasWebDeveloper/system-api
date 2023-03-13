import express from 'express';
import rateLimit from 'express-rate-limit';

import systemRoute from './routes/systemRoute';
import errorController from './controllers/errorController';

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1000 * 60 * 60,
  max: 100,
  message:
    'Sorry, you have exceeded the rate limit. Please wait and try again later. Thank you for your understanding.',
});

app.use('/', rateLimiter);
app.use('/system', systemRoute);

app.use(errorController);

export default app;
