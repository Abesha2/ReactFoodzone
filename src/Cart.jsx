import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearCart, DecrCart, IncrCart, OrderDetails, RemoveFromCart } from './store';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';
import { useNavigate, useLocation } from 'react-router-dom';
import './cart.css';

function Cart() {
    const cartObjects = useSelector((globalState) => globalState.cart);
    const user = useSelector(state => state.users.currentUser); // Get user login state from Redux
    const isAuthenticated = useSelector(state => state.users.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [couponName, setCouponName] = useState("");
    const cupponCodeRef = useRef("");
    const [cupponPercenttage, setcupponPercenttage] = useState(0);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [customerEmail, setCustomerEmail] = useState("");
    const [redirectCountdown, setRedirectCountdown] = useState(10);

    // Apply coupon code
    const hadilingCuponPer = () => {
        const cupponCode = cupponCodeRef.current.value.trim().toUpperCase();
        setCouponName(cupponCode);
        switch (cupponCode) {
            case "SAVE10":
                setcupponPercenttage(10);
                break;
            case "SAVE20":
                setcupponPercenttage(20);
                break;
            case "SAVE30":
                setcupponPercenttage(30);
                break;
            default:
                setcupponPercenttage(0);
                alert("Invalid Coupon Code");
                break;
        }
    };

    // Calculate totals
    const AmountCalculations = () => {
        const totalPrice = cartObjects.reduce((total, item) => total + item.price * item.quantity, 0);
        const discountAmount = (totalPrice * discountPercentage) / 100;
        const afterDiscount = totalPrice - discountAmount;
        const couponDiscountAmount = (afterDiscount * cupponPercenttage) / 100;
        const taxAmount = 0.5; // fixed tax
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
            alert("Please enter your email!");
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
                applied_coupon: couponName ? `${couponName} (${cupponPercenttage}%)` : "None",
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

        setPaymentCompleted(true);
        setShowPaymentOptions(false);
        setSelectedPayment("");
        setRedirectCountdown(10);
    };

    // This function runs when "Select Payment Method" clicked
    const handleSelectPaymentClick = () => {
        if (!isAuthenticated) {
            // User not logged in, redirect to signup/login
            navigate('/login', { state: { from: location.pathname } }); // Use location
        } else {
            setShowPaymentOptions(true);
        }
    };

    return (
        <div className="cart-container1" style={{ position: 'relative', minHeight: '600px' }}>
            {!paymentCompleted && (
                <>
                    <h1>Your Cart</h1>
                    {cartObjects.length > 0 ? (
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>📸 Image</th>
                                    <th>📌 Product</th>
                                    <th>💲 Price</th>
                                    <th>🔢 Qty</th>
                                    <th>📝 Total</th>
                                    <th>❌ Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartObjects.map((item, index) => (
                                    <tr key={index} className="cart-item">
                                        <td><img src={item.images} alt={item.name} className="cart-item-image" /></td>
                                        <td>{item.name}</td>
                                        <td className="cart-item-price">${item.price.toFixed(2)}</td>
                                        <td>
                                            <div className="cart-item-quantity">
                                                <button onClick={() => dispatch(DecrCart(item))} className="qty-btn decrement">-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => dispatch(IncrCart(item))} className="qty-btn increment">+</button>
                                            </div>
                                        </td>
                                        <td className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => dispatch(RemoveFromCart(item))} className="remove-button">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="empty-cart-message">
                            <p className="empty-cart-text">Your cart is currently empty</p>
                            <div className="empty-cart-icon">🛒</div>
                            <p className="empty-cart-info">Add items to your cart and start shopping!</p>
                        </div>
                    )}

                    {cartObjects.length > 0 && (
                        <>
                            <div className="payment-details">
                                <h2>Payment Details📝</h2>
                                <table className="payment-table">
                                    <tbody>
                                        <tr><td>Total Amount:🪙</td><td>${totalPrice.toFixed(2)}</td></tr>
                                        <tr><td>Discount🎁 ({discountPercentage}%):</td><td><span className="discount-value">-${discountAmount.toFixed(2)}</span></td></tr>
                                        <tr><td>Coupon🎟 ({couponName || "None"}) {cupponPercenttage}%</td><td>-${couponDiscountAmount.toFixed(2)}</td></tr>
                                        <tr><td>Tax (Fixed):</td><td>+${taxAmount.toFixed(2)}</td></tr>
                                        <tr><td><strong>Final Price:💳</strong></td><td><strong>${finalPrice.toFixed(2)}</strong></td></tr>
                                        <tr><td>You Saved:</td><td>${discountAmount.toFixed(2)}</td></tr>
                                    </tbody>
                                </table>

                                <div className="coupon-container">
                                    <input type="text" ref={cupponCodeRef} placeholder="Enter Coupon Code" className="coupon-input" />
                                    <button onClick={hadilingCuponPer} className="apply-coupon-btn">Apply Coupon</button>
                                </div>

                                <div className="discount-buttons">
                                    <button onClick={() => setDiscountPercentage(10)} className="discount-btn">10% Discount</button>
                                    <button onClick={() => setDiscountPercentage(20)} className="discount-btn">20% Discount</button>
                                    <button onClick={() => setDiscountPercentage(30)} className="discount-btn">30% Discount</button>
                                </div>

                                <div className="email-section">
                                    <h4>📧 Enter your email to receive the order details:</h4>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={customerEmail}
                                        onChange={(e) => setCustomerEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <button onClick={handleSelectPaymentClick} className="payment-options-btn">Select Payment Method</button>
                                </div>
                            </div>

                            {showPaymentOptions && (
                                <div className="payment-method-options">
                                    <h3>Select Payment Method</h3>
                                    <button onClick={() => setSelectedPayment('qrCode')} className="payment-option-btn">Pay with QR Code</button>
                                    <button onClick={() => setSelectedPayment('card')} className="payment-option-btn">Pay with Card</button>
                                </div>
                            )}

                            {selectedPayment === 'qrCode' && (
                                <div className="qr-container mt-3">
                                    <h4>Scan UPI QR to Pay ₹{finalPrice.toFixed(2)}</h4>
                                    <QRCode value={`upi://pay?pa=9381340380@ybl&pn=foodStore&am=${finalPrice.toFixed(2)}&cu=INR`} />
                                    <p>UPI ID: <strong>9381340380@ybl</strong></p>
                                    <div>
                                        <button onClick={handleOrders} className="complete-purchase">Complete Purchase</button>
                                    </div>
                                </div>
                            )}

                            {selectedPayment === 'card' && (
                                <div className="card-container mt-3">
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
                <div className="order-confirmation-message" style={{ position: 'relative', minHeight: '200px' }}>
                    <h2>Order Confirmed!</h2>
                    <p>Thank you for your purchase. Your order details have been sent to your email address.</p>
                    <p>Redirecting to your orders page in {redirectCountdown} second{redirectCountdown !== 1 ? 's' : ''}...</p>
                </div>
            )}
        </div>
    );
}

export default Cart;
