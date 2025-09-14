import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { MyOrders } from "./pages/MyOrders";
import Auth from "./models/Auth";
import { ProductCategory } from "./pages/ProductCategory";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import AddAdress from "./pages/AddAdress";
import SellerLayout from "./pages/seller/SellerLayout";
import { SellerLogin } from "./components/seller/SellerLogin";

import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
function App() {
  const { isSeller, showUserLogin } = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <>
      {isSellerPath ? null : <Navbar />}
      {
        showUserLogin ? <Auth /> : null}
      <Toaster />
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/add-address" element={<AddAdress />} />

          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct/> : null} />
            <Route path="product-list" element={isSeller ? <ProductList/> : null} />
            <Route path="orders" element={isSeller ? <Orders /> : null} />
          </Route>
        </Routes>
      </div>
      {isSellerPath ? null : <Footer />}
    </>
  );
};

export default App
