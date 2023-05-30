import "./App.scss";
import { IconContext } from "react-icons/lib";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import ForgotPassword from "./authentication/ForgotPassword";
import ProductUpload from "./components/admin/ProductUpload";
import Orders from "./components/admin/Orders";
import ProductDetails from "./pages/products/ProductDetails";
import Products from "./pages/products/Products";

function App() {
  return (
    <IconContext.Provider
      value={{ style: { color: "#23272e", fontSize: "22px" } }}
    >
      <BrowserRouter>
        <ToastContainer
          position="top-left"
          autoClose={4000}
          closeOnClick
          theme="colored"
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="products/:whatProduct" element={<Products />} />

            <Route
              path="products/:whatProduct/productDetails/:id"
              element={<ProductDetails />}
            />

            <Route path="admin" element={<Admin />}>
              <Route path="productUpload" element={<ProductUpload />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </IconContext.Provider>
  );
}

export default App;
