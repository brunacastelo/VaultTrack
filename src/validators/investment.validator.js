const { z } = require('zod');

const investmentSchema = z.object({
  amount: z.number().positive().refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
    message: 'Amount must have at most 2 decimal places',
  }),
  bankId: z.number({ required_error: 'BankId is required' }).int(),
  isLocked: z.boolean(),
  maturityDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'maturityDate must be a valid date string',
  }),
});

module.exports = { investmentSchema };