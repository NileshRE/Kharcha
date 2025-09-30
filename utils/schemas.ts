import { z } from "zod";
import { GenderEnum } from "./enums";

const LoginSchema = z.object({
  email: z.email({ error: "Email is invalid" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const SignupSchema = z.object({
  email: z.email({ error: "Email is invalid" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
  fullName: z
    .string()
    .min(3, "At least 3 characters")
    .max(20, "At most 20 characters"),
  age: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 12, { error: "Must be at least 12 years of age" }),
  gender: z.enum(GenderEnum, { error: "Gender is required" }),
});
type SignupFormData = z.infer<typeof SignupSchema>;

export { LoginFormData, LoginSchema, SignupFormData, SignupSchema };
