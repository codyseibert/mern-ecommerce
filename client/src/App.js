import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CreateProductPage } from "./pages/CreateProductPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";
import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { LogoutPage } from "./pages/LogoutPage";

export const ShoppingCartContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const cartState = useState([]);

  const userState = useState(() => {
    const userInLocalStorage = localStorage.getItem("user");
    return userInLocalStorage ? JSON.parse(userInLocalStorage) : {};
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userState[0]));
  }, userState);

  return (
    <div className="App">
      <UserContext.Provider value={userState}>
        <ShoppingCartContext.Provider value={cartState}>
          <Router>
            <Header />
            <Switch>
              {userState[0].token && userState[0].user.role === "admin" && (
                <Route path="/create-product" component={CreateProductPage} />
              )}
              <Route path="/cart" component={ShoppingCartPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/logout" component={LogoutPage} />
              <Route path="/" component={ProductsPage} />
            </Switch>
          </Router>
        </ShoppingCartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
