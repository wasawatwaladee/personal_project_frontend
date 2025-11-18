import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import PaymentForm from "../../components/PaymentForm";
const stripePromise = loadStripe("pk_test_51SUOTeCXl2BSEPKWeoHGbWrFg5zZLP2IwZI9B7k3O1gblHWtszFGWUFzOPyUZFxCRFTgXG4trkD2qnrTqZHxu54a00w2JDVJD3");


const Payment = () => {

    const [clientSecret, setClientSecret] = useState("");



    useEffect(()=>{
        payment()
        .then((res)=>{
            console.log(res)
            setClientSecret(res.data.clientSecret)
        }).catch((err)=>{
            console.log(err)
        })
      
    }
,[])


 const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';
  return (
    <div>
        {clientSecret&&(
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
                
              <PaymentForm />
            </Elements>

        )}

    </div>
  )
}

export default Payment

