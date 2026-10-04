function Button({ children, variant = "gray", onClick, type = "button" }) {
  const baseStyle =
    "px-4 py-2 rounded-lg font-medium transition cursor-pointer";

  const variants = {
    red: "bg-red-500 text-white hover:bg-red-600",
    gray: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;
