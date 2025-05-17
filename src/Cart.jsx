import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearCart, DecrCart, IncrCart, OrderDetails, RemoveFromCart } from './store';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import confetti from 'canvas-confetti';
import 'react-toastify/dist/ReactToastify.css';
import './cart.css';

// Fires confetti effect with food-inspired colors
const fireConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;
  const defaults = { 
    startVelocity: 40, 
    spread: 360, 
    ticks: 60, 
    zIndex: 1000,
    colors: ['#d35400', '#6b8e23', '#c71585', '#f5e6cc'] // Burnt orange, olive green, deep pink, beige
  };

  const interval = setInterval(() => {
    const timeLeft = end - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    confetti(Object.assign({}, defaults, {
      particleCount: 60,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
    }));
  }, 200);
};

// Triggers glow effect on cart items
const triggerSparkle = () => {
  const items = document.querySelectorAll('.cart-item');
  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('glow');
      setTimeout(() => item.classList.remove('glow'), 1500);
    }, index * 200);
  });
};

function Cart() {
  const cartObjects = useSelector((globalState) => globalState.cart);
  const user = useSelector(state => state.users.currentUser);
  const isAuthenticated = useSelector(state => state.users.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponName, setCouponName] = useState("");
  const couponCodeRef = useRef("");
  const [couponPercentage, setCouponPercentage] = useState(0);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(10);

  // Trigger glow effect on mount
  useEffect(() => {
    if (cartObjects.length > 0) {
      triggerSparkle();
    }
  }, [cartObjects]);

  // Apply coupon code
  const handleCouponPer = () => {
    const couponCode = couponCodeRef.current.value.trim().toUpperCase();
    setCouponName(couponCode);
    switch (couponCode) {
      case "SAVE10":
        setCouponPercentage(10);
        toast.success('🍜 Coupon applied: 10% off!', { position: 'bottom-center', autoClose: 2000 });
        break;
      case "SAVE20":
        setCouponPercentage(20);
        toast.success('🍜 Coupon applied: 20% off!', { position: 'bottom-center', autoClose: 2000 });
        break;
      case "SAVE30":
        setCouponPercentage(30);
        toast.success('🍜 Coupon applied: 30% off!', { position: 'bottom-center', autoClose: 2000 });
        break;
      default:
        setCouponPercentage(0);
        toast.error('🍣 Invalid Coupon Code', { position: 'bottom-center', autoClose: 2000 });
        break;
    }
  };

  // Calculate totals
  const AmountCalculations = () => {
    const totalPrice = cartObjects.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = (totalPrice * discountPercentage) / 100;
    const afterDiscount = totalPrice - discountAmount;
    const couponDiscountAmount = (afterDiscount * couponPercentage) / 100;
    const taxAmount = 0.5; // Fixed tax
    const finalPrice = afterDiscount - couponDiscountAmount + taxAmount;
    return { totalPrice, discountAmount, couponDiscountAmount, finalPrice, taxAmount };
  };

  const { totalPrice, discountAmount, couponDiscountAmount, finalPrice, taxAmount } = AmountCalculations();

  // Countdown for redirect to orders after payment
  useEffect(() => {
    let timer;
    if (paymentCompleted && redirectCountdown > 0) {
      timer = setTimeout(() => setRedirectCountdown(count => count - 1), 1000);
    } else if (paymentCompleted && redirectCountdown === 0) {
      navigate('/orders');
    }
    return () => clearTimeout(timer);
  }, [paymentCompleted, redirectCountdown, navigate]);

  // Handle order submission
  const handleOrders = () => {
    if (!customerEmail) {
      toast.error('🍣 Please enter your email!', { position: 'bottom-center', autoClose: 2000 });
      return;
    }
    const purchaseDate = new Date().toLocaleString();
    const uniqueId = "ORD" + uuidv4().slice(0, 8).toUpperCase();

    const purchaseDetails = {
      id: uniqueId,
      date: purchaseDate,
      items: [...cartObjects],
      finalPrice,
    };

    dispatch(ClearCart());
    dispatch(OrderDetails(purchaseDetails));
    fireConfetti(); // Trigger confetti effect

    const templateParams = {
      order_id: uniqueId,
      email: customerEmail,
      orders: purchaseDetails.items.map(item => ({
        name: item.name,
        price: item.price.toFixed(2),
        units: item.quantity,
        image_url: item.images
      })),
      cost: {
        shipping: "20.00",
        tax: taxAmount.toFixed(2),
        total: finalPrice.toFixed(2),
        discount_amount: (totalPrice - discountAmount).toFixed(2),
        applied_coupon: couponName ? `${couponName} (${couponPercentage}%)` : "None",
        applied_discount: `${discountPercentage}%`,
      }
    };

    emailjs.send(
      'service_gbeya5j',
      'template_755s1aj',
      templateParams,
      'hUgUEhqHkB_yBHqyH'
    )
      .then(res => console.log("✅ Email sent:", res.status))
      .catch(err => console.error("❌ Email error:", err));

    toast.success('🍜 Order placed successfully! Check your email.', { position: 'bottom-center', autoClose: 2000 });
    setPaymentCompleted(true);
    setShowPaymentOptions(false);
    setSelectedPayment("");
    setRedirectCountdown(10);
  };

  // Handle "Select Payment Method" click
  const handleSelectPaymentClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    } else {
      setShowPaymentOptions(true);
    }
  };

  return (
    <div className="cart-container">
      <ToastContainer position="bottom-center" autoClose={2000} />
      {!paymentCompleted && (
        <>
          <h1>Your Gourmet Selection</h1>
          {cartObjects.length > 0 ? (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>🍣 Image</th>
                  <th>🍜 Dish</th>
                  <th>💰 Price</th>
                  <th>🍱 Qty</th>
                  <th>🧾 Total</th>
                  <th>🗑️ Action</th>
                </tr>
              </thead>
              <tbody>
                {cartObjects.map((item, index) => (
                  <tr key={index} className="cart-item">
                    <td>
                      <img
                        src={item.images}
                        alt={item.name}
                        className="cart-item-image"
                        onError={(e) => { e.target.src = '/images/default-food.jpg'; }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td className="cart-item-price">₹{item.price.toFixed(2)}</td>
                    <td>
                      <div className="cart-item-quantity">
                        <button onClick={() => dispatch(DecrCart(item))} className="qty-btn decrement">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(IncrCart(item))} className="qty-btn increment">+</button>
                      </div>
                    </td>
                    <td className="cart-item-total">₹{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button onClick={() => dispatch(RemoveFromCart(item))} className="remove-button">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-cart-message">
              <p className="empty-cart-text">Your  Cart is Empty!</p>
              <div className="empty-cart-icons">
                <span className="empty-cart-icon">🍳</span>
                <span className="empty-cart-icon box">🍜</span>
                <span className="empty-cart-icon basket">🍱</span>
              </div>
              <p className="empty-cart-info">Add delicious dishes to your cart!</p>
            </div>
          )}

          {cartObjects.length > 0 && (
            <>
              <div className="payment-details">
                <h2>🧾 Payment Breakdown</h2>
                <table className="payment-table">
                  <tbody>
                    <tr><td>Total Amount: 💸</td><td>₹{totalPrice.toFixed(2)}</td></tr>
                    <tr><td>Discount ({discountPercentage}%):</td><td><span className="discount-value">-₹{discountAmount.toFixed(2)}</span></td></tr>
                    <tr><td>Coupon 🏷️ ({couponName || "None"}) {couponPercentage}%</td><td>-₹{couponDiscountAmount.toFixed(2)}</td></tr>
                    <tr><td>Tax (Fixed):</td><td>+₹{taxAmount.toFixed(2)}</td></tr>
                    <tr><td><strong>Final Price: 💵</strong></td><td><strong>₹{finalPrice.toFixed(2)}</strong></td></tr>
                    <tr><td>You Saved:</td><td>₹{discountAmount.toFixed(2)}</td></tr>
                  </tbody>
                </table>

                <div className="coupon-container">
                  <input type="text" ref={couponCodeRef} placeholder="Enter Coupon Code" className="coupon-input" />
                  <button onClick={handleCouponPer} className="apply-coupon-btn">Apply Coupon</button>
                </div>

                <div className="discount-buttons">
                  <button onClick={() => setDiscountPercentage(10)} className="discount-btn">10% Off</button>
                  <button onClick={() => setDiscountPercentage(20)} className="discount-btn">20% Off</button>
                  <button onClick={() => setDiscountPercentage(30)} className="discount-btn">30% Off</button>
                </div>

                <div className="email-section">
                  <h4>📧 Email for order details:</h4>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <button onClick={handleSelectPaymentClick} className="payment-options-btn">Choose Payment Method</button>
                </div>
              </div>

              {showPaymentOptions && (
                <div className="payment-method-options">
                  <h3>Select Payment Method</h3>
                  <button onClick={() => setSelectedPayment('qrCode')} className="payment-option-btn">Pay with UPI QR</button>
                  <button onClick={() => setSelectedPayment('card')} className="payment-option-btn">Pay with Card</button>
                </div>
              )}

              {selectedPayment === 'qrCode' && (
                <div className="qr-container">
                  <h4>Scan UPI QR to Pay ₹{finalPrice.toFixed(2)}</h4>
                  <QRCode value={`upi://pay?pa=9381340380@ybl&pn=foodStore&am=${finalPrice.toFixed(2)}&cu=INR`} />
                  <p>UPI ID: <strong>9381340380@ybl</strong></p>
                  <button onClick={handleOrders} className="complete-purchase">Complete Order</button>
                </div>
              )}

              {selectedPayment === 'card' && (
                <div className="card-container">
                  <h4>Pay with Card</h4>
                  <form className="card-payment-form" onSubmit={e => { e.preventDefault(); handleOrders(); }}>
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input type="text" id="cardNumber" className="form-control" placeholder="Enter Card Number" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input type="text" id="expiryDate" className="form-control" placeholder="MM/YY" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input type="text" id="cvv" className="form-control" placeholder="Enter CVV" required />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">Pay ₹{finalPrice.toFixed(2)}</button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </>
      )}

      {paymentCompleted && (
        <div className="order-confirmation-message">
          <h2>Order Confirmed!</h2>
          <p>Your gourmet order is on its way! Details sent to your email.</p>
          <p>Redirecting to orders in {redirectCountdown} second{redirectCountdown !== 1 ? 's' : ''}...</p>
        </div>
      )}
    </div>
  );
}

export default Cart;