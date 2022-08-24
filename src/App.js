import { Routes, Route, Navigate } from "react-router-dom";
import Main from "layouts/Main/Main";
//Public Components
import { Home, Missing, Auth } from "pages";
//Protected Components
import { Memory, User } from "pages";
//Controll Access
import RequireAuth from "components/Auth/RequireAuth";
import { PersistLogin, NotRequireAuth } from "components/Auth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route element={<PersistLogin />}>
          {/* public routes */}
          <Route index element={<Home />} />

          <Route path="memory">
            <Route index element={<Navigate to="/" />} />
            <Route path=":_id" element={<Memory.Details />} />
            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="create" element={<Memory.Create />} />
              <Route path="edit" element={<Memory.Edit />} />
            </Route>
          </Route>

          <Route path="user">
            <Route index element={<Navigate to="/" />} />
            <Route path=":username" element={<User.Profile />} />
            <Route path=":username/memories" element={<User.Memories />} />
            <Route path=":username/likes" element={<User.Likes />} />
          </Route>

          {/* Prevent LoggenIn users from accessing */}
          <Route element={<NotRequireAuth />}>
            <Route path="login" element={<Auth.Login />} />
            <Route path="register" element={<Auth.Register />} />
            <Route path="activation" element={<Auth.Activation />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
