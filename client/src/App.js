import "./App.css";
import React, { useEffect, useState } from "react";
import { AppRouter } from "./AppRouter";

export const ShoppingCartContext = React.createContext();
export const UserContext = React.createContext();
export const ConfirmationContext = React.createContext();

function App() {
  const confirmationState = useState(null);

  const cartState = useState(() => {
    const cartInLocalStorage = localStorage.getItem("cart");
    return cartInLocalStorage ? JSON.parse(cartInLocalStorage) : [];
  });

  const userState = useState(() => {
    const userInLocalStorage = localStorage.getItem("user");
    return userInLocalStorage ? JSON.parse(userInLocalStorage) : {};
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userState[0]));
  }, userState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState[0]));
  }, cartState);

  return (
    <div className="App">
      <UserContext.Provider value={userState}>
        <ShoppingCartContext.Provider value={cartState}>
          <ConfirmationContext.Provider value={confirmationState}>
            <AppRouter />
          </ConfirmationContext.Provider>
        </ShoppingCartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
