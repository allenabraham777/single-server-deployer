import { Navigate, Outlet } from "react-router-dom";
import useStore from "store/store";

type Props = {};

const AuthLayout = (props: Props) => {
  const { isLoggedIn } = useStore((state) => state.user);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="w-[90%]">
        <div className="flex flex-col w-[100%] sm:w-96 mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
