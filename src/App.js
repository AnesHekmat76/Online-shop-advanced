import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import SignInPage from "./pages/SignInPage";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import NotFoundPage from "./pages/NotFoundPage";
import BasicAlert from "./components/UI/Alert";
import { Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import CartPage from "./pages/CartPage";
import FavoritesPage from "./components/favorites/Favorites";
import { useSelector } from "react-redux";
import "../src/App.css";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/products" element={<ProductsPage />} />
          {isLoggedIn && <Route path="/cart" element={<CartPage />} />}
          {isLoggedIn && (
            <Route path="/profile/favorites" element={<FavoritesPage />} />
          )}
          <Route path="/passwordRecovery" element={<PasswordRecoveryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <BasicAlert />
      </main>
      <Footer />
    </>
  );
};

export default App;
