import { useEffect, useRef, useContext } from "react";

export default function PaypalButton({
  formDataRef,
  dataParams,
  formRef,
  onOrderComplete,
  setOrderResult,
  setIsOpen,
  setSpinner,
  setIsInput,
  initialForm,
}) {
  /* const [orderResult, setOrderResult] = useState(null); */
  console.log("PaypalButton rendered");
  console.log("window.paypal:", window.paypal);
  const SERVER_URL = "https://flower-store-site-react-ver.onrender.com";
  //const SERVER_URL = "http://localhost:8080";
  const paypalRef = useRef(null);
  const initialized = useRef(false);
  useEffect(() => {
    if (!window.paypal) {
      console.error("PayPal SDK has not loaded.");
      return;
    }
    if (!formRef.current?.checkValidity()) {
      console.log("Form is invalid");
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

        /*   onInit(data, actions) {
          /* paypalActions = actions;  */
        //Store actions for later use in form validation
        /* actions.disable(); */
        /*  checkFormValidity(); */
        /*    console.log("🔥 PAYPAL INIT");
          actions.enable();
        }, */

        async createOrder() {
          console.log("🔥 CREATE ORDER CALLED");
          // Get the order details from the form and localstorage
          const orderDetails = {
            cart: dataParams.cart,
            customer: formDataRef.current.customer,
            paymentMethod: formDataRef.current.paymentMethod,
          };
          console.log("🔥 ORDER DETAILS BEING SENT:", orderDetails);
          if (orderDetails.paymentMethod !== "paypal") {
            throw new Error(
              "Selected payment method is not PayPal. Please select PayPal to proceed.",
            );
          }

          //send the cart and customer info to render backend
          const response = await fetch(`${SERVER_URL}/api/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetails),
          });

          const data = await response.json();

          console.log("🔥 PayPal response from server:", data);
          console.log("🔥 PayPal order ID:", data.id);

          return data.id;
        },

        async onApprove(data, actions) {
          console.log("🔥 ON APPROVE", data);
          //loader
          setIsOpen(true);
          setSpinner("credit");
          document.body.classList.add("no-scroll");
          try {
            const response = await fetch(
              `${SERVER_URL}/api/orders/${data.orderID}/capture`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(dataParams),
              },
            );

            const result = await response.json(); //capture the passed result from the server.js
            setOrderResult(result);
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message
            console.log("FULL SERVER RESULT:", result); //data received from render backend (jsonResponse: JSON.parse(body))
            console.log("Payment type:", result.type);
            console.log("Google Script result:", result.googleScript);
            console.log("Full response:", result);
            const errorDetail = result?.paypal?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
              // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              // recoverable state, per
              // https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/

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
              console.log("Capture result", result.paypal);
            }

            if (result.googleScript.success) {
              console.log("Result: " + result);
              console.log("googleScript: " + result.googleScript);
              onOrderComplete(result);
              setIsInput(initialForm);
            }
          } catch (error) {
            console.error(error);
            console.error("🔥 PAYPAL ERROR", error);
            resultMessage(
              `Sorry, your transaction could not be processed...<br><br>Please try again or choose another payment method.`,
            );
          } finally {
            setIsOpen(false);
            setSpinner(null);
          }
        },
      })
      .render(paypalRef.current);

    return () => {
      if (copyRef) {
        copyRef = false;
      }
    };
  }, [dataParams]);
  console.log(dataParams);
  return (
    <>
      <div ref={paypalRef}></div>
    </>
  );
}
