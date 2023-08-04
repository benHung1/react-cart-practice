import data from "../data";
import { useEffect, useContext, useState } from "react";
import { CartContext } from "../store";

const Cart = () => {
  const [state, dispatch] = useContext(CartContext);

  useEffect(() => {
    console.log(data);
  }, []);

  // 創建本地數量狀態映射表，初始化所有商品數量為 1
  const [productQtys, setProductQtys] = useState(
    data.reduce((acc, product) => {
      console.log(acc, product);
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  const handleQtyChange = (productId, qty) => {
    setProductQtys((prevQtys) => ({
      ...prevQtys,
      [productId]: qty,
    }));
  };

  const handleAddToCart = (product, qty) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        qty: qty,
      },
    });

    // 重置數量
    setProductQtys((prevQtys) => ({
      ...prevQtys,
      [product.id]: 1,
    }));
  };

  return (
    <article className="grid sm:grid-cols-3 gap-5 w-[70%] p-5">
      {data.map((product) => {
        return (
          <div
            key={product.id}
            className="grid gap-2 border-2 border-gray-200 rounded-xl"
          >
            <img
              className="h-[200px] w-full object-cover rounded-xl"
              src={product.img}
              alt={product.img}
            />

            <div className="flex justify-between mx-5">
              <span>{product.title}</span>
              <span>NT$ {product.price}</span>
            </div>

            <select
              className="border-2 border-black p-1 rounded-xl mx-5"
              onChange={(e) => {
                const qty = parseInt(e.target.value);
                handleQtyChange(product.id, qty); // 使用商品的 id 來識別
              }}
              value={productQtys[product.id]} // 使用商品的 id 從映射表中獲取數量
            >
              {[...Array(99)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>

            <button
              className="text-blue-200 border-blue-100 border-2 mx-5 rounded-xl mt-2 mb-5"
              onClick={(e) => {
                handleAddToCart(product, productQtys[product.id]);
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
