import * as Yup from "Yup";

export const signupSchema = Yup.object({
  name: Yup.string().min(2).max(15).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirm_password: Yup.string()
    .required("Please enter confirm password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
