export default function Overlay({ type, paypal, orderResult, onClose }) {
  return (
    <div className="overlay">
      {type === "loading" && <span className="overlay-spinner"></span>}
      {type === "COD" && (
        <div id="loading-overlay" className="loading-overlay">
          <div className="loader-box">
            <div className="waiting-spinner"></div>
            <h3>Placing your order...</h3>
            <p>Please wait a moment.</p>
          </div>
        </div>
      )}
      {type === "success" && orderResult && (
        <aside className="order-success-modal">
          <div>
            <h2>Order Confirmed!</h2>
            <p>Thank you for your order.</p>
            <strong>
              Order ID:
              {orderResult?.googleScript?.orderId ||
                orderResult?.orderID ||
                "N/A"}
            </strong>
            <p>Status: {orderResult?.status}</p>
            <p>Payment Method: {orderResult?.paymentMethod}</p>
            {paypal === "paypal" ? (
              <>
                <p>Transaction ID: {orderResult?.captureID}</p>
                <p>Amount Paid: ${orderResult?.amount}</p>
              </>
            ) : (
              <>
                <p>Payment will be collected upon delivery.</p>
                <p>Amount Due: ${orderResult?.amount}</p>
              </>
            )}
            <small>Please check your email for order details.</small>
            <button id="close-order-success-modal" onClick={onClose}>
              Close
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
