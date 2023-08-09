import { useEffect } from "react";
import AuthLayout from "layouts/AuthLayout/AuthLayout";
import RootLayout from "layouts/RootLayout";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import useStore from "store/store";
import ProtectedRoute from "utils/routes/ProtectedRoute";

type Props = {};

const App = (props: Props) => {
  const application = useStore((state) => state.application);
  const setTheme = useStore((state) => state.setTheme);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme);
    } else {
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AuthLayout />}>
          <Route index path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<>Home</>} />
        </Route>
      </>
    )
  );
  return (
    <div className={`${application.theme} bg-background`}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
