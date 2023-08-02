import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { Fragment, useContext } from "react";

import { CartContext } from "../store";

const Cart = () => {
  const [state, dispatch] = useContext(CartContext);

  return (
    <aside className="w-[30%] p-5 ">
      <div className="flex flex-wrap items-center w-full gap-3 p-3 bg-gray-100 rounded-xl">
        {state.cartList.map((item) => {
          return (
            <Fragment key={item.id}>
              <button
                type="button"
                onClick={() => {
                  dispatch({
                    type: "DELETE_CART_ITEM",
                    payload: {
                      ...item,
                    },
                  });
                }}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
              <img
                src={item.img}
                alt={item.title}
                className="w-[60px] h-[60px]"
              />
              <div className="flex flex-col">
                <span>{item.title}</span>
                <span>NT$ {item.price}</span>
              </div>
              <label htmlFor="#"></label>
              <select
                className="border-2 border-black p-1 rounded-xl"
                value={item.qty}
                onChange={(e) => {
                  const qty = parseInt(e.target.value);

                  dispatch({
                    type: "CHANGE_SELECT_QTY",
                    payload: {
                      ...item,
                      qty,
                    },
                  });
                }}
              >
                {[...Array(99)].map((item, index) => {
                  return (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  );
                })}
              </select>
              <span>NT$ {item.price * item.qty}</span>
              <div className="border-b-2 border-b-gray-200 w-full"></div>
            </Fragment>
          );
        })}

        <span className="ml-auto">總金額 NT$ ${state.total || 0}</span>
      </div>
    </aside>
  );
};

export default Cart;
