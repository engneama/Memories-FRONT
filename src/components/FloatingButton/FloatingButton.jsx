//Hooks
import { useSelector } from "react-redux";
//Components
import { Link } from "react-router-dom";
//UI Components
import { Button } from "@mantine/core";
//Icons
import { TbPlus } from "react-icons/tb";
//Styles
import "./styles.css";

const FloatingButton = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Button
      style={{ display: !user && "none" }}
      className="FAB"
      component={Link}
      to="/createMemory"
    >
      <TbPlus size={32} />
    </Button>
  );
};

export default FloatingButton;
