import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must not exceed 50 characters")
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens",
    )
    .required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export type TLoginFormValues = Yup.InferType<typeof loginValidationSchema>;
