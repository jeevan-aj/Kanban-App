import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Board from "./Layout/Board";
import PrivateSigninRoute, { PrivateRoute } from "./pages/privateSignInRoutes";
import ErrorPage from "./pages/ErrorPage";



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* login signup routes */}
          <Route path="*" element={<ErrorPage/>}/>
          <Route>
            <Route element={<PrivateSigninRoute/>}>
              <Route path="/" element={<Signin/>} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Route>

          {/* other routes after loggedIn */}
          <Route>
            <Route element={<PrivateRoute/>}>
              <Route path="/board" element={<Board/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
