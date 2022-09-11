import React, { useState } from "react";
// import Button from "../UI/Button";
import "./ProductItem.css";
// import { cartAction } from "../../store/cart-slice";
// import { useDispatch } from "react-redux";
import { useCallback } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

const ProductItem = (props) => {
  const { id, name, price, imageUrl, inventory } = props.product;
  const [favoriteButtonToolTipText, setFavoriteButtonToolTipText] =
    useState("Add to favorite");
  //   const dispatch = useDispatch();

  const addToCartEventHandler = useCallback(() => {
    //   const selectedProduct = {
    //     id,
    //     name,
    //     price,
    //     quantity: 1,
    //   };
    //   dispatch(cartAction.addItem(selectedProduct));
    console.log(id);
  }, [id]);

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
            disabled={inventory === 0}
          >
            {inventory > 0 ? "Add to cart" : "Unavailable"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default React.memo(ProductItem);
