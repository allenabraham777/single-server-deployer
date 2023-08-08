import { Outlet } from "react-router-dom";

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div>
        <div className="flex flex-col w-96">
          <div className="border p-8 rounded-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
