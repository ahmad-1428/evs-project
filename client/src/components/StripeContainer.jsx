import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";


const stripePromise = loadStripe(
  "pk_test_51ObPUrEuIl4Bw1QjCtuaF7PswfAF3YLNKkIZEHFBBpc2v7j5vfunfE0agxABfbpnCuZTjQxYfW5QzqufjpTQQcaF003pgpeCLt"
);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripeForm />
    </Elements>
  );
};

export default StripeContainer;
