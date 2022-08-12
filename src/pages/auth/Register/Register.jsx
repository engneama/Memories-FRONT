//Packages
import { yupResolver } from "@hookform/resolvers/yup";
//Hooks
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useStyles } from "./styles";
//Actions
import { auth } from "services";
//Components
import { Link } from "react-router-dom";
import { FormProvider } from "react-hook-form";
//UI Components
import { Button, List, Anchor, Paper } from "@mantine/core";
import { Title, Text, Container, Stack } from "@mantine/core";
import { Common } from "components";
//Icons
import { TbSend } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
//Validations
import { registerSchema } from "rules";

const Register = () => {
  const { classes } = useStyles();

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

    try {
      const response = await auth.register(data);

      setResMsg(response.data.message);
      setIsSuccess(true);
      setShowResMsg(true);

      methods.reset();
    } catch (error) {
      const msg =
        error?.code === "ERR_NETWORK"
          ? "Cannot connect to the server. Please check your connection."
          : error?.response?.data?.message;

      setIsSuccess(false);
      setResMsg(msg);
      setShowResMsg(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.section}>
      <Container size="xs">
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

        <Paper withBorder className={classes.paper}>
          {/* response message  */}
          {showResMsg && !isSuccess && <Common.Alerts.Failure msg={resMsg} />}
          {showResMsg && isSuccess && <Common.Alerts.Success msg={resMsg} />}

          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {/* Form Context */}
            <FormProvider {...methods}>
              <Stack>
                {/* Username field */}
                <Common.ControlledFields.Text
                  type="text"
                  name="username"
                  label="Username"
                  holder="username"
                  desc="must be between 2 and 12 characters"
                  icon={<FiUser />}
                />
                {/* Email field */}
                <Common.ControlledFields.Text
                  type="email"
                  name="email"
                  label="Email"
                  holder="example@example.com"
                  icon={<MdAlternateEmail />}
                />
                {/* Password Field */}
                <Common.ControlledFields.Password
                  name="password"
                  label="Password"
                  holder="Your password"
                  desc={passwordDescription}
                />
                {/* Confirm Password Field */}
                <Common.ControlledFields.Password
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
