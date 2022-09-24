import CartItem from "./CartItem";
const cartItems = [
  {
    id: 1,
    name: "Iphone 13 pro max",
    imageUrl: "https://cdn01.zoomit.ir/2022/9/iphone-14-pro-max-purple-1.jpg",
    price: 1200,
    quantity: 1,
  },
  {
    id: 2,
    name: "ASUS lap top",
    imageUrl: "https://m.media-amazon.com/images/I/81oVSSITRQL._AC_SS450_.jpg",
    price: 800,
    quantity: 2,
  },
  {
    id: 3,
    name: "Samsung LED Monitor",
    imageUrl:
      "https://images.samsung.com/is/image/samsung/sg-led-sr350-ls27r350fhexxs-frontblack-215191820?$650_519_PNG$",
    price: 450,
    quantity: 2,
  },
];
const cartItemList = cartItems.map((product) => {
  return <CartItem product={product} key={product.id} />;
});

const Cart = () => {
  return (
    <div className="max-w-4xl mx-auto mt-6 md:mt-12 lg:mt-16 px-4 sm:px-6">
      <h1 className="text-gray-500 text-2xl mb-5 md:mb-7">Shopping Cart</h1>
      {cartItemList}
      <div className="mt-6 sm:px-4 md:px-6 p-2 sm:py-4 flex justify-between items-center rounded-md bg-slate-100 shadow-md">
        <p className="text-gray-500 text-xl">Total price: 1240 $</p>
        <button className="text-gray-600 border border-gray-400 py-1.5 px-9 rounded-md hover:border-black transition bg-white">
          Buy
        </button>
      </div>
    </div>
  );
};
export default Cart;
