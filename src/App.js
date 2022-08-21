import { Routes, Route } from "react-router-dom";
import Main from "layouts/Main/Main";
//Public Components
import { Home, Missing, Auth } from "pages";
//Protected Components
import { Memory, Comment, Like } from "pages";
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
          <Route path="memory/:_id" element={<Memory.Details />} />

          {/* Prevent LoggenIn users from accessing */}
          <Route element={<NotRequireAuth />}>
            <Route path="login" element={<Auth.Login />} />
            <Route path="register" element={<Auth.Register />} />
            <Route path="activation" element={<Auth.Activation />} />
          </Route>

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="createMemory" element={<Memory.Create />} />
            <Route path="editMemory" element={<Memory.Edit />} />
            <Route path="likes" element={<Like.Create />} />
            <Route path="comments" element={<Comment.Create />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
