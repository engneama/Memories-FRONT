//Hooks
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useStyles } from "./styles";
//Axios
import { auth } from "services";
//UI Components
import { Container, Loader, Title, Text } from "@mantine/core";
//Icons
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Activation = () => {
  let interval;
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [status, setStatus] = useState("pending");
  const [statusCode, setStatusCode] = useState(0);
  const [title, setTitle] = useState("Hold on");
  const [msg, setMsg] = useState(
    "Please wait while we check with the server..."
  );

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const icon = {
    pending: <Loader size={52} />,
    failure: (
      <FaTimesCircle
        size={52}
        color="red"
        title="failure Icon"
        className={classes.icon}
      />
    ),
    success: (
      <FaCheckCircle
        size={52}
        color="teal"
        title="Success Icon"
        className={classes.icon}
      />
    ),
  };

  const verifyCode = async () => {
    const isCodeValid = uuidRegex.test(code);

    if (!isCodeValid) {
      setStatus("failure");
      setTitle("Invalid");
      setMsg(
        `The given code is Invalid.\nPlease check your email and try again.`
      );
      return setStatusCode(406);
    }

    try {
      const { data } = await auth.verifyCode(code);
      setStatus("success");
      setTitle("Done! 🎉");
      setMsg(data.message);

      interval = setInterval(() => navigate("/login", { replace: true }), 5000);
    } catch (error) {
      setStatus("failure");
      setTitle("Uh Oh!");
      setMsg(error.response.data.message);
      return setStatusCode(error.response.data.statusCode);
    }
  };

  useEffect(() => {
    verifyCode();

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={classes.section}>
      <Container className={classes.Container}>
        <div>
          <div>{icon[status]}</div>
          <div>
            <Title>{title}</Title>
          </div>
          <div>
            <Text size="lg" className={classes.msg}>
              {msg}
            </Text>
            {status === "failure" && (
              <Text size="sm" color="dimmed">
                error code: {statusCode}
              </Text>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Activation;

const uuidRegex =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
