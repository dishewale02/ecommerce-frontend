import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import SignUpForm from "./ui/auth/SignUpForm";
import SignInForm from "./ui/auth/SignInForm";
import ForgotPassword from "./ui/auth/ForgotPassword";
import ResetPassword from "./ui/auth/ResetPassword";
import AuthGuard from "./contexts/AuthGuard";
import { AuthProvider } from "./contexts/AuthContext";
import { HomePage } from "./ui/LayoutPages/Home";
import { AccountDetailsPage } from "./ui/Account/AccountDetailsPage";
import { CategoryProvider } from "./contexts/CategoryContext";
import ProductList from "./ui/Product/ProductList";
import CreateProductForm from "./ui/Product/CreateProductForm";
import AdminLayout from "./ui/Admin/AdminLayout";
import Dashboard from "./ui/Admin/Dashboard/Dashboard";
import AdminUserList from "./ui/Admin/Users/AdminUsersList";
import ProductDetails from "./ui/Product/ProductDetails";
import { CartProvider } from "./contexts/CartContext";
import ShowCart from "./ui/Product/ShowCart";
import AdminProductsList from "./ui/Admin/Products/AdminProductsList";
import AdminSettings from "./ui/Admin/Setting/AdminSetting";
import { ThemeProvider } from "./contexts/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <AdminUserList />,
      },
      {
        path: "products",
        element: <AdminProductsList />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUpForm />,
  },
  {
    path: "/account-details",
    element: <AccountDetailsPage />,
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
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/products/:selectedCategory/:searchField",
    element: <ProductList />,
  },
  {
    path: "/products/create-new",
    element: (
      <AuthGuard roles={["ADMIN"]}>
        <CreateProductForm />
      </AuthGuard>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "/product/details/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/cart",
    element: <ShowCart />,
  },
]);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CategoryProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </CategoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
