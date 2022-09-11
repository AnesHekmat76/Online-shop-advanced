import Logo2 from "../../assets/amazon3.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import "./Navigation.css";

const Navigation = () => {
  const [isProfileDialogDisplayed, setIsProfileDialogDisplayed] =
    useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignInButtonClick = () => {
    dispatch(authAction.logoutHandler());
    navigate("../signIn");
  };
  const logOutButtonHandler = () => {
    dispatch(authAction.logoutHandler());
    setIsProfileDialogDisplayed(false);
  };
  const hideProfileModal = () => {
    setIsProfileDialogDisplayed(false);
  };

  return (
    <>
      <nav className="border-b border-gray-300 py-3 px-4 sm:py-3 sm:px-6 mx-auto flex justify-between sticky top-0 bg-gray-50 shadow-sm z-10 items-center">
        <Link to="/products">
          <div className="hover:opacity-75 transition-opacity">
            <img className="h-8" alt="logo" src={Logo2} />
          </div>
        </Link>
        <div className="mr-4">
          {!isLoggedIn && (
            <button
              onClick={onSignInButtonClick}
              className="ml-14 text-gray-600 hover:text-black transition-all border-gray-300"
            >
              <LoginOutlinedIcon />
            </button>
          )}
          {isLoggedIn && (
            <button
              onClick={() => {
                setIsProfileDialogDisplayed((state) => !state);
              }}
            >
              <PersonOutlineRoundedIcon className="text-gray-500 hover:text-gray-700 transition-all" />
            </button>
          )}
          <div className="relative inline ml-6 sm:ml-8">
            <Link to="/cart">
              <ShoppingCartOutlinedIcon className="text-gray-500 hover:text-gray-700 transition-all" />
            </Link>
            <div className="absolute inline">
              <Avatar
                sx={{
                  backgroundColor: "#e25141",
                  width: "18px",
                  height: "18px",
                  fontSize: "12px",
                }}
                alt="Remy Sharp"
                src="/broken-image.jpg"
              >
                {2}
              </Avatar>
            </div>
          </div>
        </div>
      </nav>
      {isProfileDialogDisplayed && (
        <div className="bg-white w-52 fixed right-8 top-12 sm:right-24 sm:top-11 rounded-lg shadow-md border border-gray-300 z-20 py-2">
          <div
            onClick={hideProfileModal}
            className="border-b hover:bg-gray-200 transition"
          >
            <Link
              to="/profile"
              className="py-3 px-4 text-gray-600 flex items-center"
            >
              <PersonOutlineRoundedIcon className="text-gray-500" />
              <p className="ml-2">Moheb Moalem</p>
            </Link>
          </div>
          <div
            onClick={hideProfileModal}
            className="border-b hover:bg-gray-200 transition"
          >
            <Link
              to="/profile/orders"
              className="py-3 px-4 text-gray-600 flex items-center"
            >
              <ShoppingBagOutlinedIcon className="text-gray-500" />
              <p className="ml-2">Orders</p>
            </Link>
          </div>
          <div
            onClick={hideProfileModal}
            className="border-b hover:bg-gray-200 transition"
          >
            <Link
              to="/profile/favorites"
              className="py-3 px-4 text-gray-600 flex items-center"
            >
              <FavoriteBorderIcon className="text-gray-500" />
              <p className="ml-2">Favorites</p>
            </Link>
          </div>
          <div
            onClick={hideProfileModal}
            className="hover:bg-gray-200 transition"
          >
            <button
              onClick={logOutButtonHandler}
              className="py-3 px-4 text-gray-600 flex items-center w-full"
            >
              <LogoutRoundedIcon className="text-gray-500" />
              <p className="ml-2">Log out</p>
            </button>
          </div>
        </div>
      )}
      {isProfileDialogDisplayed && (
        <div
          onClick={hideProfileModal}
          className="w-full h-screen z-10 bg-gray-400 fixed opacity-50 top-0"
        ></div>
      )}
    </>
  );
};
export default Navigation;
