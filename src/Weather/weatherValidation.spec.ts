import { expect } from 'chai';
import { describe, it } from 'mocha';
import { validateInput } from './weatherValidation';
import { ValidationError } from 'joi';

describe('validateInput', () => {
  it('should validate valid input', async () => {
    const validLatitude = '40.25';
    const validLongitude = '-74.83';
    const result = await validateInput(validLatitude, validLongitude);
    expect(result).to.deep.equal({ lat: 40.25, lon: -74.83 });
  });

  it('should reject invalid latitude', async () => {
    const invalidLatitude = '91';
    const validLongitude = '-74';
    try {
      await validateInput(invalidLatitude, validLongitude);
    } catch (err: unknown) {
      expect(err).instanceOf(ValidationError);
      expect((err as ValidationError).message).to.equal(
        '"lat" must be less than or equal to 90'
      );
    }
  });

  it('should reject invalid longitude', async () => {
    const validLatitude = '40';
    const invalidLongitude = '181';
    try {
      await validateInput(validLatitude, invalidLongitude);
    } catch (err: unknown) {
      expect(err).instanceOf(ValidationError);
      expect((err as ValidationError).message).to.equal(
        '"lon" must be less than or equal to 180'
      );
    }
  });

  it('should reject empty latitude', async () => {
    try {
      await validateInput(undefined, '45');
    } catch (err: unknown) {
      expect(err).instanceOf(ValidationError);
      expect((err as ValidationError).message).to.equal('"lat" is required');
    }
  });

  it('should reject non-numeric input', async () => {
    const nonNumericLatitude = 'abcd';
    const validLongitude = '-74';
    try {
      await validateInput(nonNumericLatitude, validLongitude);
    } catch (err: unknown) {
      expect(err).instanceOf(ValidationError);
      expect((err as ValidationError).message).to.equal(
        '"lat" must be a number'
      );
    }
  });
});
