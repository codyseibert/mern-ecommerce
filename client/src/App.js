import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CreateProductPage } from "./pages/CreateProductPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";
import React, { useState } from "react";
import { Header } from "./components/Header";
import { RegisterPage } from "./pages/RegisterPage";

export const ShoppingCartContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const cartState = useState([]);
  const userState = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={userState}>
        <ShoppingCartContext.Provider value={cartState}>
          <Router>
            <Header />
            <Switch>
              <Route path="/create-product" component={CreateProductPage} />
              <Route path="/cart" component={ShoppingCartPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/" component={ProductsPage} />
            </Switch>
          </Router>
        </ShoppingCartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
