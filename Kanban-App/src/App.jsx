import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Board from "./Layout/Board";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* login signup routes */}
          <Route>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* other routes after loggedIn */}
          <Route>
            <Route path="/board" element={<Board/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
