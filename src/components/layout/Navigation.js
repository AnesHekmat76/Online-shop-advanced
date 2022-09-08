import Logo2 from "../../assets/amazon3.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignInButtonClick = () => {
    if (navIsOpen) setNavIsOpen(false);
    if (isLoggedIn) {
      dispatch(authAction.logoutHandler());
      navigate("../");
    } else {
      navigate("../signIn");
    }
  };

  const onLinksClick = () => {
    setNavIsOpen(false);
  };
  return (
    <>
      <nav className="border-b border-gray-300 py-3 px-4 sm:py-3 sm:px-6 mx-auto flex justify-between sticky top-0 bg-white z-10 items-center">
        <Link to="/">
          <div className="hover:opacity-75 transition-opacity">
            <img className="h-8" alt="logo" src={Logo2} />
          </div>
        </Link>
        <div className="mr-4 hidden md:block">
          {isLoggedIn && (
            <>
              <Link
                to="/"
                className="ml-14 text-gray-600 hover:text-black"
                href="123"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="ml-14 text-gray-600 hover:text-black"
                href="123"
              >
                Products
              </Link>
              <Link
                to="/createPoll"
                className="ml-14 text-gray-600 hover:text-black"
                href="123"
              >
                Create
              </Link>
            </>
          )}

          <button
            onClick={onSignInButtonClick}
            className="ml-14 text-gray-600 hover:text-black hover:border-gray-600 transition-all border border-gray-300 px-4 py-1.5 rounded-lg"
          >
            {isLoggedIn ? "Sign out" : "Sign in"}
          </button>
        </div>
        <div className="md:hidden">
          {!navIsOpen && (
            <button
              onClick={() => {
                setNavIsOpen(true);
              }}
            >
              <MenuIcon className="text-gray-600" />
            </button>
          )}
          {navIsOpen && (
            <button
              onClick={() => {
                setNavIsOpen(false);
              }}
            >
              <CloseIcon className="text-gray-600" />
            </button>
          )}
        </div>
      </nav>
      {navIsOpen && (
        <div className="w-full h-92vh sticky z-20 bg-white top-14 left-0 md:hidden pt-16">
          <div className="flex flex-col items-center h-full z-20">
            {isLoggedIn && (
              <>
                <Link
                  onClick={onLinksClick}
                  to="/"
                  className="m-7 text-gray-500 sm:text-lg"
                >
                  Home
                </Link>
                <Link
                  onClick={onLinksClick}
                  to="/products"
                  className="m-7 text-gray-500 sm:text-lg"
                >
                  Products
                </Link>
                <Link
                  onClick={onLinksClick}
                  to="/createPoll"
                  className="m-7 text-gray-500 sm:text-lg"
                >
                  Create
                </Link>
              </>
            )}

            <button
              onClick={onSignInButtonClick}
              to="/"
              className="m-7 text-gray-500 sm:text-lg"
            >
              {isLoggedIn ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Navigation;
