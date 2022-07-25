//Packages
import { yupResolver } from "@hookform/resolvers/yup";
//Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useStyles } from "./styles";
//Components
import { Link } from "react-router-dom";
import { FormProvider } from "react-hook-form";
//UI Components
import { Button, List, Anchor, Paper } from "@mantine/core";
import { Title, Text, Container, Stack } from "@mantine/core";
import ControlledField from "components/common/ControlledInputField/ControlledField";
import ControlledPasswordField from "components/ControlledPasswordField/ControlledPasswordField";
import ResponseAlert from "components/common/Alert/ResponseAlert";
//Actions
import { register as registerThunk } from "store/auth/auth.thunk";
//Icons
import { TbSend } from "react-icons/tb";
//Validations
import { registerSchema } from "rules";

const Register = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showResMsg, setShowResMsg] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const methods = useForm({
    resolver: yupResolver(registerSchema),
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

    if (payload?.code) {
      const msg =
        payload?.code === "ERR_NETWORK"
          ? "Cannot connect to the server. Please check your connection."
          : payload?.response?.data?.message;

      setIsSuccess(false);
      setResMsg(msg);
      setShowResMsg(true);
    } else {
      setIsSuccess(true);
      setResMsg(payload?.message);
      setShowResMsg(true);
    }

    setIsLoading(false);
  };

  return (
    <section className={classes.section}>
      {/* Welcome phrase + redirect to Login page */}
      <div>
        <Title align="center" className={classes.title}>
          Welcome to the family!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          <Anchor component={Link} to="/login" size="sm">
            Already have an account? Login
          </Anchor>
        </Text>
      </div>

      <Container size="25em">
        <Paper withBorder className={classes.paper}>
          {/* response message  */}
          {showResMsg && <ResponseAlert isSuccess={isSuccess} msg={resMsg} />}

          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {/* Form Context */}
            <FormProvider {...methods}>
              <Stack>
                {/* Username field */}
                <ControlledField
                  type="text"
                  name="username"
                  label="Username"
                  holder="username"
                  desc="must be between 2 and 12 characters"
                />
                {/* Email field */}
                <ControlledField
                  type="email"
                  name="email"
                  label="Email"
                  holder="example@example.com"
                />
                {/* Password Field */}
                <ControlledPasswordField
                  name="password"
                  label="Password"
                  holder="Your password"
                  desc={passwordDescription}
                />
                {/* Confirm Password Field */}
                <ControlledPasswordField
                  name="confirmPassword"
                  label="Confirm password"
                  holder="Your password"
                  desc="both password fields must match"
                />
              </Stack>
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
