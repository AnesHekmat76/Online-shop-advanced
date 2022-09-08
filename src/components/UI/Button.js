const Button = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-sm text-sm bg-btn-blue text-white px-5 py-1.5 hover:opacity-80 transition-opacity transition-duration: 150ms shadow-lg"
    >
      Add to cart
    </button>
  );
};
export default Button;
