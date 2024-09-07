import { Router } from 'express';
import { fetchCurrentWeather } from './weather/weatherController';

const router = Router();

router.get('/weather', fetchCurrentWeather);

export default router;
