import { useEffect } from "react";
import AuthLayout from "layouts/AuthLayout/AuthLayout";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import useStore from "store/store";
import ProtectedRoute from "utils/routes/ProtectedRoute";
import DashboardPage from "pages/DashboardPage";
import { ThemeProvider } from "context/ThemeProvider";

type Props = {};

const App = (props: Props) => {
  const { setUserFromToken } = useStore();
  useEffect(() => {
    setUserFromToken();
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<AuthLayout />}>
          <Route index path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </>
    )
  );
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-background">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};

export default App;
