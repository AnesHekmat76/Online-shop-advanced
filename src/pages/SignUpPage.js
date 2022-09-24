import SignUpForm from "../components/forms/SignUpForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthenticationForm from "../components/forms/AuthenticationForm";

const SignUpPage = () => {
  //   const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isAuthFormDisplayed, setIsAuthFormDisplayed] = useState(true);
  const displayAuthForm = () => {
    setIsAuthFormDisplayed(true);
  };
  const hideAuthForm = () => {
    setIsAuthFormDisplayed(false);
  };

  //   useEffect(() => {
  //     if (isLoggedIn) {
  //       navigate("../products");
  //     }
  //   }, [navigate, isLoggedIn]);

  return (
    <div className="max-w-lg sm:max-w-xl mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 sm:px-6">
      {!isLoggedIn && !isAuthFormDisplayed && (
        <SignUpForm displayAuthForm={displayAuthForm} />
      )}
      {isAuthFormDisplayed && (
        <AuthenticationForm hideAuthForm={hideAuthForm} />
      )}
    </div>
  );
};
export default SignUpPage;
