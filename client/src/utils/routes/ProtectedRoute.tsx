import { useLocation, Outlet, Navigate } from "react-router-dom";
import useStore from "store/store";

const ProtectedRoute = () => {
  const isLoggedIn = useStore((state) => state.user);
  let location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

export default ProtectedRoute;
