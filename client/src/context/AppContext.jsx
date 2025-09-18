import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// ✅ Ensure axios sends cookies & points to backend
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // User States
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState({});
  
  // Seller States
  const [isSeller, setIsSeller] = useState(null);

  //show login  
  const [showUserLogin, setShowUserLogin] = useState(false);
  

  // Products & Search
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ----------------------------
  // USER FUNCTIONS
  // ----------------------------
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth", { withCredentials: true });
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cart || {});
      } else {
        setUser(null);
      }
    } catch (error) {
      if (error.response?.status !== 401) {
    toast.error(error.response?.data?.message || error.message);
  }
  setUser(null);
    }
  };

  const userLogout = async () => {
  try {
    const { data } = await axios.post("/api/user/logout", {}, { withCredentials: true });
    if (data.success) {
      setUser(null);
      navigate("/");
      toast.success(data.message);
    }
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
};


  

  // ----------------------------
  // SELLER FUNCTIONS
  // ----------------------------
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success  || false);
    } catch (error) {
      setIsSeller(false);
      if (error.response?.status !== 401) {
      toast.error(error.response?.data?.message || error.message);
    }
    }
  };

  const sellerLogin = async (email, password) => {
    try {
      const { data } = await axios.post(
        "/api/seller/login",
        { email, password },
        { withCredentials: true,
           headers: { "Content-Type": "application/json" },
         }
      );
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const sellerLogout = async () => {
    try {
      const { data } = await axios.post("/api/seller/logout", {}, { withCredentials: true });
      if (data.success) {
        setIsSeller(false);
        navigate("/");
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // ----------------------------
  // PRODUCT FUNCTIONS
  // ----------------------------
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products);
    } catch (err) {
      console.log("fetchProducts error:", err);
    }
  };

  // ----------------------------
  // CART FUNCTIONS
  // ----------------------------
  const addToCart = (itemId) => {
    const newCart = { ...cartItems };
    newCart[itemId] = newCart[itemId] ? newCart[itemId] + 1 : 1;
    setCartItems(newCart);
    toast.success("Added to cart");
  };

  const removeFromCart = (itemId) => {
    const newCart = { ...cartItems };
    if (newCart[itemId]) {
      newCart[itemId] -= 1;
      if (newCart[itemId] === 0) delete newCart[itemId];
      setCartItems(newCart);
      toast.success("Removed from cart");
    }
  };

  const cartCount = () => Object.values(cartItems).reduce((a, b) => a + b, 0);


  const totalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) total += cartItems[id] * product.offerPrice;
    }
    return Math.round(total * 100) / 100;
  };

  // Sync cart with backend whenever user changes it
  useEffect(() => {
    const updateCart = async () => {
      if (!user?._id) return;
      try {
        await axios.post("/api/cart/update", { cartItems }, { withCredentials: true });
      } catch (err) {
        console.log("updateCart error:", err);
      }
    };
    updateCart();
  }, [cartItems, user]);

  // Fetch initial data
  useEffect(() => {
    fetchProducts();
    fetchUser();
    fetchSeller();
  }, []);

  return (
    <AppContext.Provider
      value={{
        navigate,
        user,
        setUser,
        isSeller,
        setIsSeller,
        sellerLogin,
        sellerLogout,
        products,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        cartCount,
        totalCartAmount,
        searchQuery,
        setSearchQuery,
        axios,
        showUserLogin,     
    setShowUserLogin, 
    userLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
