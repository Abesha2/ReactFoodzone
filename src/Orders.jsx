import React from 'react';
import { useSelector } from 'react-redux';
import './orders.css';
;

function Orders() {
  const orders = useSelector((state) => state.orders);

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

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orderList.length > 0 ? (
        orderList.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-header">
              <div className="order-date">{order.date}</div>
              <div className="order-id">Order ID: {order.id}</div>
            </div>
            <h4 className="order-details-heading">Items</h4>
            <ul className="order-items-list">
              {order.items.map((item, idx) => (
                <li key={idx} className="order-item-row">
                  <img src={item.image} alt={item.name} className="order-item-image" />
                  <div className="order-item-info">
                    <div className="order-item-name">{item.name}</div>
                    <div className="order-item-quantity">Quantity: {item.quantity}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="order-total-section">
              <span className="order-total-label">Total:</span>
              <span className="order-total-price">₹{order.finalPrice.toFixed(2)}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="no-orders">You have no orders yet.</p>
      )}
    </div>
  );
}

export default Orders;