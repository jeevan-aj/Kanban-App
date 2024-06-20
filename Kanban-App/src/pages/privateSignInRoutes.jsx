import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.initialSlice);
  console.log(currentUser) 
  return currentUser ? <Outlet /> : <Navigate to={"/"} />;
}

export const PrivateSigninRoute = () => {
  const { currentUser } = useSelector((state) => state.initialSlice); 
  if (!currentUser) {
    return <Outlet />;
  }

  if (currentUser) {
    return <Navigate to="/board" />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateSigninRoute;
