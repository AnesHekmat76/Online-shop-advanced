import React, { useState } from "react";
// import Button from "../UI/Button";
import "./ProductItem.css";
// import { cartAction } from "../../store/cart-slice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItemToCart, getUserCart } from "../../store/cart-action";
import { alertAction } from "../../store/alert-slice";

const ProductItem = (props) => {
  const { id, name, price, imageUrl, inventory } = props.product;
  const token = useSelector((state) => state.auth.token);
  const [favoriteButtonToolTipText, setFavoriteButtonToolTipText] =
    useState("Add to favorite");
  const dispatch = useDispatch();

  const addToCartEventHandler = async () => {
    // try {
    //   const response = await axios({
    //     method: "post",
    //     url: `http://localhost:8080/cart/add-product/${id}`,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: token,
    //     },
    //   });
    //   dispatch(getUserCart(token));
    //   dispatch(
    //     alertAction.showAlert({
    //       message: "Added to cart",
    //       type: "success",
    //     })
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
    dispatch(addItemToCart(token, id));
  };

  const onFavoriteButtonClick = () => {
    setFavoriteButtonToolTipText("Added");
    setTimeout(() => {
      setFavoriteButtonToolTipText("Add to favorite");
    }, 1500);
    console.log(id);
  };

  return (
    <div className="border rounded-md border-gray-200 shadow-md my-4 w-full max-w-md mx-auto sm:max-w-none sm:w-46/100 sm:mx-2 md:mx-3 lg:w-3/10 xl:mx-5 relative">
      <Tooltip title={favoriteButtonToolTipText} placement="top">
        <button
          onClick={onFavoriteButtonClick}
          className="absolute right-5 top-5"
        >
          <FavoriteBorderIcon className="text-gray-500" />
        </button>
      </Tooltip>

      <div className="p-2 h-64 flex justify-center items-center">
        <img
          className="object-cover object-center h-11/12 sm:h-10/12 lg:h-12/12"
          alt="product"
          src={imageUrl}
        ></img>
      </div>

      <div className="mt-6 p-4 xl:p-6">
        <h3 className="text-xl font-semibold limit-line-1">
          {name.length > 22 ? `${name.substring(0, 30)}...` : name}
        </h3>
        <div className="mt-5 flex justify-between items-center">
          <p className={`text-sm lg:text-md`}>{price} $</p>
          <Button
            size="small"
            onClick={addToCartEventHandler}
            variant="contained"
            disabled={inventory.number === 0}
          >
            {inventory.number > 0 ? "Add to cart" : "Unavailable"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default React.memo(ProductItem);
