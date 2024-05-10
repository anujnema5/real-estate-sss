import express, { Application } from 'express';
import routes from './routes/routes';
import { primaryMiddlewares, secondayMiddlewares } from './middlewares/main.middleware';

export const app: Application = express();

primaryMiddlewares(app);
app.use(routes)
secondayMiddlewares(app)