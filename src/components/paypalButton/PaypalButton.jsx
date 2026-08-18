import { useEffect, useRef } from "react";

export default function PaypalButton({ dataParams }) {
  console.log("PaypalButton rendered");
  console.log("window.paypal:", window.paypal);
  const SERVER_URL = "https://flosandflorere.onrender.com";
  //const SERVER_URL = "http://localhost:8080";
  const paypalRef = useRef(null);
  const initialized = useRef(false);
  useEffect(() => {
    if (!window.paypal) {
      console.error("PayPal SDK has not loaded.");
      return;
    }
    let copyRef = paypalRef.current;
    if (!copyRef) return;
    // Prevent initialization more than once
    if (initialized.current) return;

    initialized.current = true;
    console.log("About to create PayPal Buttons");
    window.paypal
      .Buttons({
        style: {
          shape: "rect",
          layout: "vertical",
          color: "gold",
          label: "paypal",
        },

        onInit(data, actions) {
          /* paypalActions = actions;  */
          //Store actions for later use in form validation
          /* actions.disable(); */
          /*  checkFormValidity(); */
          console.log("🔥 PAYPAL INIT");
          actions.enable();
        },

        async createOrder() {
          console.log("🔥 CREATE ORDER CALLED");
          // Get the order details from the form and localstorage
          const orderDetails = dataParams;
          /* const orderDetails = getOrderDetails();
          if (orderDetails.paymentMethod !== "paypal") {
            throw new Error(
              "Selected payment method is not PayPal. Please select PayPal to proceed.",
            );
          }
          console.log("Frontend cart:", orderDetails.cart);
          console.log("Selected payment method:", orderDetails.paymentMethod); */

          const response = await fetch(`${SERVER_URL}/api/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetails), //Send cart and customer info to the server
          });

          const data = await response.json();

          console.log("🔥 PayPal response from server:", data);
          console.log("🔥 PayPal order ID:", data.id);

          return data.id;
        },

        async onApprove(data, actions) {
          console.log("🔥 ON APPROVE", data);
          /* showLoadingOverlay(); */
          document.body.classList.add("no-scroll");
          try {
            const response = await fetch(
              `${SERVER_URL}/api/orders/${data.orderID}/capture`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );

            //const orderData = await response.json(); the original code
            const result = await response.json(); //capture the passed result from the server.js
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message
            console.log("FULL SERVER RESULT:", result);
            console.log("Payment type:", result.type);
            console.log("Google Script result:", result.googleScript);
            console.log("Full response:", result);
            const errorDetail = result?.paypal?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
              // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              // recoverable state, per
              // https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
              /* hideLoadingOverlay(); */
              /* document.body.classList.remove("no-scroll"); */
              return actions.restart();
            } else if (errorDetail) {
              // (2) Other non-recoverable errors -> Show a failure message
              throw new Error(
                `${errorDetail.description} (${result.paypal.debug_id})`,
              );
            } else if (!result.paypal.purchase_units) {
              throw new Error(JSON.stringify(result.paypal));
            } else {
              // (3) Successful transaction -> Show confirmation or thank you message
              // Or go to another URL:  actions.redirect('thank_you.html');
              /* const transaction =
                result.paypal?.purchase_units?.[0]?.payments?.captures?.[0] ||
                result.paypal?.purchase_units?.[0]?.payments
                  ?.authorizations?.[0];
               resultMessage(
                `Transaction ${transaction.status}: ${transaction.id}
                  <br>Thank you for trying our service!<br>`,
              );  */
              console.log("Capture result", result.paypal);
            }

            if (result.googleScript.success) {
              console.log("Result: " + result);
              console.log("googleScript: " + result.googleScript);
              /* showOrderSuccessModal(result);
              hideLoadingOverlay(); */
              /* document.body.classList.remove("no-scroll"); */
            }
          } catch (error) {
            /* hideLoadingOverlay(); */
            /* document.body.classList.remove("no-scroll"); */
            console.error(error);
            console.error("🔥 PAYPAL ERROR", error);
            /* resultMessage(
              `Sorry, your transaction could not be processed...<br><br>${error}`,
            ); */
          }
        },
      })
      .render(copyRef);

    return () => {
      if (copyRef) {
        copyRef = false;
      }
    };
  }, [dataParams]);
  console.log(dataParams);
  return <div ref={paypalRef}></div>;
}
