import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller", {
      withCredentials: true, // ✅ send cookies (token)
    });
      console.log("Orders data:", data);

      if (data.success) {
        setOrders(data.orders || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order, index) => {
          const firstImage =
            order.items?.[0]?.product?.image?.[0] || "/placeholder.png";

          return (
            <div
              key={index}
              className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
            >
              {/* Left: Product details */}
              <div className="flex gap-5">
                <img
                  className="w-12 h-12 object-cover opacity-60"
                  src={`https://grocery-1-tnq8.onrender.com/images/${firstImage}`}
                  alt="product"
                />

                <div className="flex flex-col justify-center">
                  {order.items?.map((item, i) => (
                    <p key={i} className="font-medium">
                      {item?.product?.name || "Unnamed Product"}{" "}
                      <span
                        className={`text-indigo-500 ${
                          item?.quantity < 2 && "hidden"
                        }`}
                      >
                        x {item?.quantity}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Middle: Address */}
              <div className="text-sm">
                <p className="font-medium mb-1">
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p>
                  {order.address?.street}, {order.address?.city},{" "}
                  {order.address?.state}, {order.address?.zipcode},{" "}
                  {order.address?.country}, 
                </p>
                 {order.address?.phone && (
                  <p className="mt-1 text-indigo-600 font-medium">
                    📞 {order.address.phone}
                  </p>
                )}
              </div>

              {/* Right: Amount */}
              <p className="font-medium text-base my-auto text-black/70">
                ${order.amount}
              </p>

              {/* Right: Payment info */}
              <div className="flex flex-col text-sm">
                <p>Method: {order.paymentType || "N/A"}</p>
                <p>Date: {order.orderDate || "N/A"}</p>
                <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;
