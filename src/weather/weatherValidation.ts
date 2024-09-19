import Joi from 'joi';
import { rawInput, validInput } from './schema/types';

const maxLatitude = 90;
const minLatitude = -90;
const minLongitude = -180;
const maxLongitude = 180;

/**
 * This method validates the input parameters
 * and returns the sanitized input
 * If a validation error occurs, it throws an instance of Joi.ValidationError
 * @param lat rawInput
 * @param lon rawInput
 * @returns {lat:number, lon:number}
 * @throws Joi.ValidationError
 */
export async function validateInput(
  lat: rawInput,
  lon: rawInput
): Promise<validInput> | never {
  const inputObject: { lat?: number; lon?: number } = {
    ...(lat != null && lat !== '' ? { lat: Number(lat) } : {}),
    ...(lon != null && lon !== '' ? { lon: Number(lon) } : {}),
  };

  const validationSchema = Joi.object({
    lat: Joi.number().min(minLatitude).max(maxLatitude).required(),
    lon: Joi.number().min(minLongitude).max(maxLongitude).required(),
  });

  const sanitizedInput: validInput =
    await validationSchema.validateAsync(inputObject);

  return sanitizedInput;
}
