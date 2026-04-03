const { z } = require('zod');

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(['viewer', 'analyst', 'admin']).optional(),
  is_active: z.boolean().optional()
});

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: z.enum(['viewer', 'analyst', 'admin']).optional(),
  is_active: z.boolean().optional()
});

const updateUserStatusSchema = z.object({
  is_active: z.boolean()
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema
};
