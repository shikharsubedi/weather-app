import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import { validateInput } from './weatherValidation';
import { validInput, rawInput } from './schema/types';

import WeatherService from './WeatherService';
import { IResponseGenerator } from './schema/IResponseGenerator';
import { ResponseGenerator } from './ResponseGenerator';

export async function fetchCurrentWeather(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> {
  try {
    const sanitizedInput: validInput = await validateInput(
      req.query?.lat as rawInput,
      req.query?.lon as rawInput
    );
    const responseGenerator: IResponseGenerator = new ResponseGenerator();
    const service = new WeatherService(
      sanitizedInput.lat,
      sanitizedInput.lon,
      responseGenerator
    );
    const result = await service.fetchWeather();
    return res.status(200).json(result);
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      console.error(err.message);
      return res.status(400).json({ message: err.message });
    } else {
      return next(err);
    }
  }
}
