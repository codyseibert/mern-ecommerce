import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateProduct from "./pages/CreateProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/create-product" component={CreateProduct}></Route>
          <Route path="/">Home</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
