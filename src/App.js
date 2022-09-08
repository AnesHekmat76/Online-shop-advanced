import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import NotFoundPage from "./pages/NotFoundPage";
import BasicAlert from "./components/UI/Alert";
import "../src/App.css";

const App = () => {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <BasicAlert />
      </main>
      <Footer />
    </>
  );
};

export default App;
