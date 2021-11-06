import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { useIsAdmin } from "./hooks/useIsAdmin";
import { CreateProductPage } from "./pages/CreateProductPage";
import { EditProduct } from "./pages/EditProduct";
import { LoginPage } from "./pages/LoginPage";
import { LogoutPage } from "./pages/LogoutPage";
import { ProductsPage } from "./pages/ProductsPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ShoppingCartPage } from "./pages/ShoppingCartPage";

export const AppRouter = () => {
  const isAdmin = useIsAdmin();

  return (
    <Router>
      <Header />
      <Switch>
        {isAdmin && (
          <Route path="/create-product" component={CreateProductPage} />
        )}
        <Route path="/products/:productId/edit" component={EditProduct} />
        <Route path="/cart" component={ShoppingCartPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/" component={ProductsPage} />
      </Switch>
    </Router>
  );
};
