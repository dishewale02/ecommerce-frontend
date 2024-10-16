import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUpForm from "./ui/auth/SignUpForm";
import SignInForm from "./ui/auth/SignInForm";
import ForgotPassword from "./ui/auth/ForgotPassword";
import ResetPassword from "./ui/auth/ResetPassword";
import AuthGuard from "./contexts/AuthGuard";
import { AuthProvider } from "./contexts/AuthContext";
import { HomePage } from "./ui/auth/Home";
import { AccountDetailsPage } from "./ui/auth/AccountDetailsPage";
import { CategoryProvider } from "./contexts/CategoryContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/sign-up",
    element: <SignUpForm />,
  },
  {
    path: "/account-details",
    element: (
      <AuthGuard>
        <AccountDetailsPage />
      </AuthGuard>
    ),
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
      <CategoryProvider>
        <RouterProvider router={router} />
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
