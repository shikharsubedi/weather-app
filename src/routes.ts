import { Router, Request, Response } from 'express';
import { fetchCurrentWeather } from './weather/weatherController';

const router = Router();

router.get('/health-check',(req:Request, res:Response) => res.status(200).json({ message: 'OK'}))

router.get('/api/v1/weather/current', fetchCurrentWeather);

export default router;
