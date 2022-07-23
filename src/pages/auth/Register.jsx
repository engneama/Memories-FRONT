//Packages
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
//Components
import { Link } from "react-router-dom";
import { Button, List, Anchor, Paper } from "@mantine/core";
import { Title, Text, Container, Box } from "@mantine/core";
import { FormProvider } from "react-hook-form";
import ControlledField from "components/common/ControlledInputField/ControlledField";
import ControlledPasswordField from "components/ControlledPasswordField/ControlledPasswordField";
import ResponseAlert from "components/common/Alert/ResponseAlert";
//Actions
import { register as registerThunk } from "store/auth/auth.thunk";
//Icons
import { TbSend } from "react-icons/tb";
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
const passwordDescription = (
  <List size="xs" withPadding>
    <List.Item>At least 6 characters</List.Item>
    <List.Item>
      Include uppercase and lowercase letters, a number,
      <br />
      and a special character.
    </List.Item>
    <List.Item>Allowed special characters: ! @ # $ %</List.Item>
  </List>
);

const Register = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showResMsg, setShowResMsg] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const methods = useForm({
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
        <Anchor component={Link} to="/login" size="sm">
          Already have an account? Login
        </Anchor>
      </Text>
      <Container size="25em">
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {showResMsg && <ResponseAlert isSuccess={isSuccess} msg={resMsg} />}
            <FormProvider {...methods}>
              <ControlledField
                type="text"
                name="username"
                label="Username"
                holder="username"
                desc="must be between 2 and 12 characters"
              />

              <Box mt="md">
                <ControlledField
                  type="email"
                  name="email"
                  label="Email"
                  holder="example@example.com"
                />
              </Box>

              <Box my="md">
                <ControlledPasswordField
                  name="password"
                  label="Password"
                  holder="Your password"
                  desc={passwordDescription}
                />
              </Box>

              <ControlledPasswordField
                name="confirmPassword"
                label="Confirm password"
                holder="Your password"
                desc="both password fields must match"
              />
            </FormProvider>

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
