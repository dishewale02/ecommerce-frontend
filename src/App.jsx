import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUpForm from "./ui/auth/SignUpForm";
import SignInForm from "./ui/auth/SignInForm";
import ForgotPassword from "./ui/auth/ForgotPassword";
import ResetPassword from "./ui/auth/ResetPassword";
import AuthGuard from "./contexts/AuthGuard";
import { AuthProvider } from "./contexts/AuthContext";
import { HomePage } from "./ui/auth/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <HomePage />
      </AuthGuard>
    ),
  },
  {
    path: "/sign-up",
    element: <SignUpForm />,
  },
  {
    path: "/sign-in",
    element: <SignInForm />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
