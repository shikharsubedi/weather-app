import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.disable('x-powered-by');

app.use('/api/v1', routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Resource not found.');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Server error.');
});
