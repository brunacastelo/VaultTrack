const { investmentSchema } = require('../../src/validators/investment.validator');

describe('investmentSchema', () => {
  it('should validate a correct investment payload', () => {
    const result = investmentSchema.safeParse({
      initialAmount: 100.25,
      bankId: 1,
      isLocked: true,
      maturityDate: '2025-12-31T00:00:00.000Z',
    });

    expect(result.success).toBe(true);
  });

  it('should fail when amount has more than 2 decimal places', () => {
    const result = investmentSchema.safeParse({
      initialAmount: 100.251,
      bankId: 1,
      isLocked: true,
      maturityDate: '2025-12-31T00:00:00.000Z',
    });

    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe('Initial amount must have at most 2 decimal places');
  });

  it('should fail when bankId is missing', () => {
    const result = investmentSchema.safeParse({
      initialAmount: 100.25,
      isLocked: true,
      maturityDate: '2025-12-31T00:00:00.000Z',
    });

    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe('BankId is required');
  });
});