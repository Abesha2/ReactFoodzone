import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './orders.css';

function Orders() {
  const orders = useSelector((state) => state.orders);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const orderList = orders.map((order) => ({
    id: order.id,
    date: order.date,
    finalPrice: order.finalPrice,
    items: order.items.map(item => ({
      image: item.images,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }))
  }));

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="orders-container">
      <h1>🍽️ Your Food Orders</h1>
      {orderList.length > 0 ? (
        orderList.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-date">📅 {order.date}</span>
              <span className="order-id">🧾 Order ID: {order.id}</span>
            </div>
            <button
              className="view-details-btn"
              onClick={() => toggleOrderDetails(order.id)}
            >
              {expandedOrder === order.id ? 'Hide Details' : 'View Order Details'} 🍴
            </button>
            {expandedOrder === order.id && (
              <div className="order-details">
                <h4 className="order-details-heading">🍕 Order Items</h4>
                <ul className="order-items-list">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="order-item-row">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="order-item-image"
                        onError={(e) => {
                          e.target.src = '/images/default-food.jpg';
                        }}
                      />
                      <div className="order-item-info">
                        <div className="order-item-name">{item.name}</div>
                        <div className="order-item-quantity">
                          Quantity: {item.quantity} | Price: ₹{item.price.toFixed(2)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="order-total-section">
                  <span className="order-total-label">Total:</span>
                  <span className="order-total-price">₹{order.finalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="no-orders">🍽️ No food orders yet. Start exploring our menu!</p>
      )}
    </div>
  );
}

export default Orders;