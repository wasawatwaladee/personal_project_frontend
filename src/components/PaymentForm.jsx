import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import '../stripe.css'
import { saveOrder } from "../api/user";
import { toast } from "react-toastify";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const clearCart = useUserStore(state=>state.clearCart)

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
     redirect:'if_required'
    });
    console.log('payload', payload)
    console.log(payload.paymentIntent.status)
  
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (payload.error) {
      setMessage(payload.error.message);
    } else {
      saveOrder(payload)
      clearCart()
      toast.success("Payment successful")
      navigate('/shop')
      .then(res=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion"
  }




  return (
    <form className="space-y-6 p-4" id="payment-form" onSubmit={handleSubmit} >

      <h1>กรุณาเลือกวิธีการชำระเงิน</h1>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button className="stripe-button" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

