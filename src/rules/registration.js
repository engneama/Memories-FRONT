import * as yup from "yup";

const PSW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,120}$/;
const schema = yup.object().shape({
  username: yup.string().trim().min(2).max(32).required(),
  email: yup
    .string()
    .trim()
    .email("email must be a valid email: example@example.com")
    .lowercase()
    .required(),
  password: yup
    .string()
    .trim()
    .min(6)
    .matches(PSW_REGEX, {
      message:
        "Must include uppercase and lowercase letters, a number and a special character.",
    })
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default schema;
