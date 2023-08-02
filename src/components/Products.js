import data from "../data"; // 使用相對路徑載入data.js

import { useEffect, useContext, useState } from "react";

import { CartContext } from "../store";

const Cart = () => {
  const [state, dispatch] = useContext(CartContext);

  let qty;

  useEffect(() => {
    console.log(data); // 在這裡確認是否顯示商品資料陣列
  }, []);

  return (
    <article className="grid sm:grid-cols-3 gap-5 w-[70%] p-5">
      {data.map((products) => {
        return (
          <div
            key={products.id}
            className="grid gap-2 border-2 border-gray-200 rounded-xl"
          >
            <img
              className="h-[200px] w-full object-cover rounded-xl"
              src={products.img}
              alt={products.img}
            />

            <div className="flex justify-between mx-5">
              <span>{products.title}</span>

              <span>NT$ {products.price}</span>
            </div>

            <select
              className="border-2 border-black p-1 rounded-xl mx-5"
              onChange={(e) => {
                e.preventDefault();

                qty = parseInt(e.target.value);

                dispatch({
                  type: "CHANGE_PRODUCTS_QTY",
                  payload: {
                    ...products,
                    qty: qty,
                  },
                });
              }}
              value={qty}
            >
              {[...Array(99)].map((item, index) => {
                return (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                );
              })}
            </select>

            <button
              className="text-blue-200 border-blue-100 border-2 mx-5 rounded-xl mt-2 mb-5"
              onClick={(e) => {
                e.preventDefault();

                // 請問這裡是否有更好的寫法?
                document.querySelectorAll("select").forEach((item) => {
                  item.value = 1;
                });

                dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    ...products,
                    qty: qty || 1,
                  },
                });
              }}
            >
              加入購物車
            </button>
          </div>
        );
      })}
    </article>
  );
};

export default Cart;
