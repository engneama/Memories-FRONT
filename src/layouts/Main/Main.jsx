import Header from "layouts/Navigation/Header/Header";
import Footer from "layouts/Navigation/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./Main.css";

const Main = () => {
  return (
    <div className="parent">
      <Header />
      <div className="children">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
