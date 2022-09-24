import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItem = ({ product }) => {
  const { name, imageUrl, price, quantity } = product;
  return (
    <div className="w-full flex justify-between items-end sm:items-center border-b py-3 sm:px-4 md:px-6 md:py-4">
      <div className="flex">
        <img
          className="w-28 sm:w-34 h-28 object-cover object-center"
          alt="lap top"
          src={imageUrl}
        />
        <div className="ml-1.5 md:ml-4">
          <h3 className="text-sm sm:text-lg text-gray-700 font-semibold mt-2">
            {name}
          </h3>
          <p className="text-gray-500 mt-2 text-xs sm:text-base">{price} $ </p>
        </div>
      </div>
      <div className="flex items-center border p-1.5 sm:p-2.5 border-gray-200 rounded-md">
        <button>
          {quantity > 1 && (
            <RemoveIcon
              className="text-gray-500 hover:text-black transition"
              fontSize="small"
            />
          )}
          {quantity === 1 && (
            <DeleteOutlineIcon
              className="text-gray-500 hover:text-black transition"
              fontSize="small"
            />
          )}
        </button>
        <p className="mx-3 md:mx-4 text-gray-500 text-sm sm:text-base">
          {quantity}
        </p>
        <button>
          <AddIcon
            className="text-gray-500 hover:text-black transition"
            fontSize="small"
          />
        </button>
      </div>
    </div>
  );
};
export default CartItem;
