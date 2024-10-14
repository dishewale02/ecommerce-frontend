import MainContent from "./MainContent";
import Footer from "./Footer";
import Header from "./Header";

export const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};
