const { z } = require('zod');

const createTransactionSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, "Category is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"), // simple date validation
  notes: z.string().optional()
});

const updateTransactionSchema = createTransactionSchema.partial();

module.exports = {
  createTransactionSchema,
  updateTransactionSchema
};
