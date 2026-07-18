import { validate } from 'class-validator';
import { describe } from 'node:test';
import 'reflect-metadata';
import { makeAddTransactionDto } from './factories/add-transaction.dto.factory';

describe('AddTransactionDto', () => {
  it('should accept if is correct', async () => {
    const dto = makeAddTransactionDto();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  describe('amount', () => {
    it('should fail if is not a number', async () => {
      const dto = makeAddTransactionDto({ amount: 'amount' });
      const errors = await validate(dto);
      const error = errors[0];
      expect(errors.length).toBe(1);
      expect(error.property).toBe('amount');
      expect(error.constraints).toHaveProperty('isNumber');
    });
  });

  describe('timestamp', () => {
    it('should fail if is not a date', async () => {
      const dto = makeAddTransactionDto({ timestamp: 'timestamp' });
      const errors = await validate(dto);
      const error = errors[0];
      expect(errors.length).toBe(1);
      expect(error.property).toBe('timestamp');
      expect(error.constraints).toHaveProperty('isDate');
    });
  });
});
