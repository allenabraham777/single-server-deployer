import DashboardPage from "pages/DashboardPage";
import { Outlet } from "react-router-dom";

type Props = {};

const DashboardLayout = (props: Props) => {
  return (
    <>
      <DashboardPage />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
