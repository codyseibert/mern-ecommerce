import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CreateProductPage } from "./pages/CreateProductPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";
import React, { useState } from "react";
import { Header } from "./components/Header";

export const ShoppingCartContext = React.createContext();

function App() {
  const cartState = useState([]);

  return (
    <div className="App">
      <ShoppingCartContext.Provider value={cartState}>
        <Router>
          <Header />
          <Switch>
            <Route path="/create-product" component={CreateProductPage} />
            <Route path="/cart" component={ShoppingCartPage} />
            <Route path="/" component={ProductsPage} />
          </Switch>
        </Router>
      </ShoppingCartContext.Provider>
    </div>
  );
}

export default App;
