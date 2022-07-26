import { Routes, Route } from "react-router-dom";
import Main from "layouts/Main/Main";
//Public Components
import Home from "pages/Home";
import Login from "pages/auth/Login/Login";
import Register from "pages/auth/Register/Register";
//Protected Components
import RequireAuth from "components/Auth/RequireAuth";
import CreateMemory from "pages/CreateMemory";
import Activation from "pages/auth/Activation/Activation";

import { PersistLogin, NotRequireAuth } from "components/Auth";
import Missing from "pages/Missing/Missing";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route element={<PersistLogin />}>
          {/* public routes */}
          <Route index element={<Home />} />
          {/* Prevent LoggenIn users from accessing */}
          <Route element={<NotRequireAuth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="activation" element={<Activation />} />
          </Route>

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
