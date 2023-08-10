import Header from "components/commons/Header";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import useStore from "store/store";

const ProtectedRoute = () => {
  const { isLoggedIn } = useStore((state) => state.user);
  let location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return (
    <div className="h-[100vh] overflow-y-scroll bg-background">
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
