import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Grid, Box } from "@mui/material";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
            <CardElement options={{ hidePostalCode: true }} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" disabled={!stripe}>
            Pay
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
