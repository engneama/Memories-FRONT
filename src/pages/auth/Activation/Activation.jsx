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
//Vatiables
const uuidRegex =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const Activation = () => {
  let interval;
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [res, setRes] = useState({
    status: "pending",
    title: "Hold on",
    msg: "Please wait while we check with the server...",
  });

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
      return setRes({
        status: "failure",
        title: "Invalid",
        msg: "The given code is Invalid.\nPlease check your email and try again.",
      });
    }

    try {
      const { data } = await auth.verifyCode(code);

      setRes({
        status: "success",
        title: "Done! 🎉",
        msg: data.message,
      });

      interval = setInterval(() => navigate("/login", { replace: true }), 5000);
    } catch (error) {
      return setRes({
        status: "failure",
        title: "Uh Oh!",
        msg: error.response.data.message,
      });
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
          <div>{icon[res.status]}</div>
          <div>
            <Title>{res.title}</Title>
          </div>
          <div>
            <Text size="lg" className={classes.msg}>
              {res.msg}
            </Text>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Activation;
