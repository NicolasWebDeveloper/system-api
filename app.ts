import express from 'express';
import rateLimit from 'express-rate-limit';

import systemRoute from './routes/systemRoute';
import documentationRoute from './routes/documentationRoute';
import errorController from './controllers/errorController';
import cors from 'cors';

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1000 * 60 * 60,
  max: 100,
  message:
    'Sorry, you have exceeded the rate limit. Please wait and try again later. Thank you for your understanding.',
});

app.use(
  cors({
    origin: '*',
  })
);

app.use('/', rateLimiter);
app.use('/system', systemRoute);
app.use('/documentation', documentationRoute);

app.use(errorController);

export default app;
