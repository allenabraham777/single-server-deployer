import { Outlet } from "react-router-dom";

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div>
        <div className="flex flex-col w-96">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
