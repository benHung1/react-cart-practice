import { useReducer } from "react";

import { CartContext, cartReducer, cartInit } from "./store";

import "./assets/App.css";

import Products from "./components/Products";

import Navbar from "./components/Navbar";

import Cart from "./components/Cart";

function App() {
  const reducer = useReducer(cartReducer, cartInit);

  return (
    <>
      <CartContext.Provider value={reducer}>
        <Navbar />
        <div className="w-full flex">
          <Products />
          <Cart />
        </div>
      </CartContext.Provider>
    </>
  );
}

export default App;
