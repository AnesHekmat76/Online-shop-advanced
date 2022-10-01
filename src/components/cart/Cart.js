import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserCart } from "../../store/cart-action";
import { useSelector } from "react-redux";

const Cart = () => {
  const [cartError, setCartError] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalPrice = useSelector((state) => state.cart.totalPrice);
  useEffect(() => {
    const getCart = async () => {
      const error = await dispatch(getUserCart(token));
      if (error) {
        setCartError("Some thing went wrong");
      }
    };
    if (!cartItems) {
      getCart();
    }
  }, [token, dispatch, cartItems]);

  const cartItemList = cartItems?.map((item) => {
    return <CartItem item={item} key={item.id} />;
  });

  if (cartError) {
    return (
      <div className="max-w-4xl mx-auto mt-6 md:mt-12 lg:mt-16 px-4 sm:px-6">
        <h1 className="text-gray-500 text-2xl mb-5 md:mb-7">Shopping Cart</h1>
        <h3 className="mt-10 text-center text-lg text-red-800">
          Some thing went wrong
        </h3>
      </div>
    );
  }

  if (cartItems && cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-6 md:mt-12 lg:mt-16 px-4 sm:px-6">
        <h1 className="text-gray-500 text-2xl mb-5 md:mb-7">Shopping Cart</h1>
        <h3 className="mt-10 text-center text-lg text-gray-800">
          There is no product
        </h3>
      </div>
    );
  }

  if (cartItems && cartItems.length !== 0) {
    return (
      <div className="max-w-4xl mx-auto mt-6 md:mt-12 lg:mt-16 px-4 sm:px-6">
        <h1 className="text-gray-500 text-2xl mb-5 md:mb-7">Shopping Cart</h1>
        {cartItemList}
        <div className="mt-6 sm:px-4 md:px-6 p-2 sm:py-4 flex justify-between items-center rounded-md bg-slate-100 shadow-md">
          <p className="text-gray-500 text-xl">
            Total price: {cartTotalPrice} $
          </p>
          <button className="text-gray-600 border border-gray-400 py-1.5 px-9 rounded-md hover:border-black transition bg-white">
            Buy
          </button>
        </div>
      </div>
    );
  }
};
export default Cart;
