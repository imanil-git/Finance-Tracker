import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().trim().min(3, "Username must be at least 3 characters."),

    email: z.email("Invalid Email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain one uppercase letter")
      .regex(/[a-z]/, "Password must contain one lowercase letter")
      .regex(/[0-9]/, "Password must contain one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain speical character",
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});
