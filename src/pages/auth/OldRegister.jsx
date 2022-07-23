//Packages
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
//import { register as registerAPI } from "../services/api/auth";

//Actions
import { register as registerThunk } from "store/auth/auth.thunk";

//Components
import { Link } from "react-router-dom";
import { TextInput, Button, Alert, List, PasswordInput } from "@mantine/core";
import { Anchor, Paper, Title, Text, Container } from "@mantine/core";

//Icons
import { TbSend } from "react-icons/tb";
import { FaExclamationTriangle } from "react-icons/fa";
import ResponseAlert from "components/common/Alert/ResponseAlert";

//Variables
const PSW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,120}$/;
const schema = yup.object().shape({
  username: yup.string().trim().min(2).max(12).required(),
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

const Register = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showResMsg, setShowResMsg] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setShowResMsg(false);
    setIsLoading(true);

    const { payload } = await dispatch(registerThunk(data));

    if (payload?.response?.data?.statusCode) {
      setIsSuccess(false);
      setResMsg(payload?.response?.data?.message);
      setShowResMsg(true);
    } else {
      setIsSuccess(true);
      console.log(payload);
      setResMsg(payload?.message);
      setShowResMsg(true);
    }

    setIsLoading(false);
  };

  return (
    <section>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome to the family!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        <Anchor component={Link} to="/auth/login" size="sm">
          Already have an account? Login
        </Anchor>
      </Text>
      <Container size="25em">
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            {showResMsg && <ResponseAlert isSuccess={isSuccess} msg={resMsg} />}
            <TextInput
              required
              type="text"
              name="username"
              label="Username"
              placeholder="username"
              description="must be between 2 and 12 characters"
              error={errors?.username?.message && errors?.username?.message}
              {...register("username", {
                onChange: (e) => trigger(e.target.name),
              })}
            />

            <TextInput
              my="md"
              required
              type="email"
              name="email"
              label="Email"
              placeholder="example@example.com"
              error={errors?.email?.message && errors?.email?.message}
              {...register("email", {
                onChange: (e) => trigger(e.target.name),
              })}
            />

            <PasswordInput
              my="md"
              required
              name="password"
              label="Password"
              placeholder="Your password"
              description={
                <List size="xs" withPadding>
                  <List.Item>At least 6 characters</List.Item>
                  <List.Item>
                    Include uppercase and lowercase letters, a number,
                    <br />
                    and a special character.
                  </List.Item>
                  <List.Item>Allowed special characters: ! @ # $ %</List.Item>
                </List>
              }
              error={errors?.password?.message && errors?.password?.message}
              {...register("password", {
                onChange: (e) => trigger(e.target.name),
              })}
            />

            <PasswordInput
              my="md"
              required
              name="confirmPassword"
              label="Confirm password"
              placeholder="Your password"
              description={"both password fields must match"}
              error={
                errors?.confirmPassword?.message &&
                errors?.confirmPassword?.message
              }
              {...register("confirmPassword", {
                onChange: (e) => trigger(e.target.name),
              })}
            />

            <Button
              mt="xl"
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              loaderPosition="right"
              leftIcon={<TbSend size={18} />}
              fullWidth
            >
              Register
            </Button>
          </form>
        </Paper>
      </Container>
    </section>
  );
};

export default Register;
