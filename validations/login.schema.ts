import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
  .required("Password is required")
//   .min(8, "Password must be at least 8 characters")
//   .matches(/[a-z]/, "Must contain at least one lowercase letter")
//   .matches(/[A-Z]/, "Must contain at least one uppercase letter")
//   .matches(/[0-9]/, "Must contain at least one number")
//   .matches(/[@$!%*?&]/, "Must contain at least one special character")
//   .matches(/^\S*$/, "Password must not contain spaces"),
});
