import { useContext } from "react";
import { CartContext } from "../store";

const Navbar = () => {
  const [state] = useContext(CartContext);

  return (
    <header>
      <ul className="flex bg-red-200 p-3 justify-between">
        <li>珍香</li>
        <li className="flex items-center gap-1">
          購物車
          <span className="bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center">
            {state.cartList.length}
          </span>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
