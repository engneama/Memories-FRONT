import { Routes, Route } from "react-router-dom";
import Main from "layouts/Main/Main";
import Home from "pages/Home";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import Missing from "pages/Missing/Missing";
import PersistLogin from "components/Auth/PersistLogin";
import RequireAuth from "components/Auth/RequireAuth";
import CreateMemory from "pages/CreateMemory";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route element={<PersistLogin />}>
          {/* public routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="create" element={<CreateMemory />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
