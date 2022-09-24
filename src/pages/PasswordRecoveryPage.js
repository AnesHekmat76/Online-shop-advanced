import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PasswordRecoveryPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  //   useEffect(() => {
  //     if (isLoggedIn) {
  //       navigate("../products");
  //     }
  //   }, [navigate, isLoggedIn]);

  return (
    <div className="max-w-lg mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 sm:px-6">
      <p>RetrievePasswordPage</p>
    </div>
  );
};
export default PasswordRecoveryPage;
