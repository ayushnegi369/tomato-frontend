import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

const Orders = () => {
    const { url, token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.post(
                    url + "/api/order/user-orders",
                    {},
                    { headers: { token } }
                );
                if (response.data.success) {
                    setOrders(response.data.orders);
                } else {
                    setError(response.data.message || "Failed to fetch orders");
                }
            } catch (err) {
                setError("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [url, token]);

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    const formatCurrency = (value) => `₹${Number(value || 0).toFixed(2)}`;

    return (
        <div style={{ padding: 24 }}>
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div style={{ display: "grid", gap: 24 }}>
                    {orders.map((order) => (
                        <div key={order._id} style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
                            <div style={{ padding: 16, background: "#fafafa", display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between" }}>
                                <div>
                                    <div style={{ fontSize: 14, color: "#666" }}>Order ID</div>
                                    <div style={{ fontWeight: 600 }}>{order._id}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, color: "#666" }}>Date</div>
                                    <div style={{ fontWeight: 600 }}>{new Date(order.date).toLocaleString()}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, color: "#666" }}>Total Amount</div>
                                    <div style={{ fontWeight: 600 }}>{formatCurrency(order.amount)}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, color: "#666" }}>Status</div>
                                    <div style={{ fontWeight: 600 }}>{order.status}</div>
                                </div>
                            </div>

                            <div style={{ padding: 16 }}>
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr style={{ textAlign: "left", background: "#f5f5f5" }}>
                                            <th style={{ padding: "10px 8px" }}>Image</th>
                                            <th style={{ padding: "10px 8px" }}>Item</th>
                                            <th style={{ padding: "10px 8px" }}>Price</th>
                                            <th style={{ padding: "10px 8px" }}>Quantity</th>
                                            <th style={{ padding: "10px 8px" }}>Line Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item, idx) => {
                                            const lineTotal = (item.price || 0) * (item.quantity || 0);
                                            const imageSrc = item.image ? `${url}/images/${item.image}` : "";
                                            return (
                                                <tr key={`${order._id}-${idx}`} style={{ borderTop: "1px solid #eee" }}>
                                                    <td style={{ padding: "10px 8px" }}>
                                                        {imageSrc ? (
                                                            <img
                                                                src={imageSrc}
                                                                alt={item.name}
                                                                style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }}
                                                            />
                                                        ) : (
                                                            <div style={{ width: 56, height: 56, borderRadius: 6, background: "#f0f0f0", display: "grid", placeItems: "center", color: "#999", fontSize: 12 }}>No Image</div>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: "10px 8px", fontWeight: 500 }}>{item.name}</td>
                                                    <td style={{ padding: "10px 8px" }}>{formatCurrency(item.price)}</td>
                                                    <td style={{ padding: "10px 8px" }}>{item.quantity}</td>
                                                    <td style={{ padding: "10px 8px", fontWeight: 600 }}>{formatCurrency(lineTotal)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders; 