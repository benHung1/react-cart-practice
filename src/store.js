import { faL } from "@fortawesome/free-solid-svg-icons";
import { createContext } from "react";

function totalPrice(cartList) {
  return cartList.map((item) => item.price * item.qty).reduce((a, b) => a + b);
}

export const cartInit = {
  cartList: [],
};

export const cartReducer = (state, action) => {
  const cartList = [...state.cartList];
  const index = cartList.findIndex((item) => item.id === action.payload.id);

  console.log(state, action);

  switch (action.type) {
    case "ADD_TO_CART":
      if (index === -1) {
        cartList.push(action.payload);
      } else {
        cartList[index].qty += action.payload.qty;

        if (cartList[index].qty > 100) {
          alert("已超過最大數量，請重新選擇");
          cartList[index].qty = 1;
        }
      }

      // document.querySelector("select").value = action.payload.qty;

      return {
        ...state,
        cartList,
        total: totalPrice(cartList),
      };

    case "CHANGE_SELECT_QTY":
      cartList[index].qty = action.payload.qty;

      return {
        ...state,
        cartList,
        total: totalPrice(cartList),
      };

    case "DELETE_CART_ITEM":
      cartList.splice(index, 1);

      return {
        ...state,
        cartList,
        total: totalPrice(cartList),
      };

    case "CHANGE_PRODUCTS_QTY":
      console.log("左邊select換了", action.payload);

    // cartList[index].qty = action.payload.qty;

    // return {
    //   ...state,
    //   cartList,
    //   total: totalPrice(cartList),
    // };

    default:
      return state;
  }
};

export const CartContext = createContext({});
