//Components
import { Outlet } from "react-router-dom";
//UI Components
import Header from "layouts/Navigation/Header/Header";
import Footer from "layouts/Navigation/Footer/Footer";
import { FloatingButton } from "components";
//Styles
import "./Main.css";

const Main = () => {
  return (
    <div className="parent">
      <FloatingButton />
      <Header />
      <div className="children">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
