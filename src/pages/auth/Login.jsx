//Packages
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
//Components
import { Link } from "react-router-dom";
import ResponseAlert from "components/common/Alert/ResponseAlert";
import { FormProvider } from "react-hook-form";
import ControlledField from "components/common/ControlledInputField/ControlledField";
import ControlledPasswordField from "components/ControlledPasswordField/ControlledPasswordField";
//Actions
import { login } from "store/auth/auth.thunk";
//UI Components
import { Button, Anchor, Paper, Title, Text, Container } from "@mantine/core";
//Icons
import { TbSend } from "react-icons/tb";
//Variables
const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("email must be a valid email: example@example.com")
    .lowercase()
    .required(),
  password: yup.string().trim().required(),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.form?.pathname || "/";

  const [isLoading, setIsLoading] = useState(false);
  const [showResMsg, setShowResMsg] = useState(false);
  const [resMsg, setResMsg] = useState("");

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setShowResMsg(false);
    setIsLoading(true);
    const { payload } = await dispatch(login(data));

    if (payload?.code) {
      const msg =
        payload?.code === "ERR_NETWORK"
          ? "Cannot connect to the server. Please check your connection."
          : payload?.response?.data?.message;
      setResMsg(msg);
      setShowResMsg(true);
    } else {
      navigate(form, { replace: true });
    }

    setIsLoading(false);
  };

  return (
    <section style={{ marginTop: "40px" }}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        <Anchor component={Link} to="/register" size="sm">
          Don't have an account? Register
        </Anchor>
      </Text>
      <Container size="25em">
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          style={{ width: "23em " }}
        >
          {showResMsg && <ResponseAlert isSuccess={false} msg={resMsg} />}

          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
              <ControlledField
                name="email"
                type="email"
                label="Email"
                holder="example@example.com"
              />
              <ControlledPasswordField
                name="password"
                label="Password"
                holder="Your password"
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
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </section>
  );
};

export default Login;
