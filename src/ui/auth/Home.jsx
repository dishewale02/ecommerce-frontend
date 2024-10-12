import { useNavigate } from "react-router-dom";
import { useAuth, AuthContext } from "../../contexts/AuthContext";
import MainContent from "./MainContent";
import Footer from "./Footer";
import Header from "./Header";

export const HomePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const onLogoutClickHandler = async () => {
    await logout();
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};
