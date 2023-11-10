import { useParams } from "react-router-dom";

function PaymentSuccess() {
  const { reference } = useParams();

  return (
    <div>
      <h1>Payment Success</h1>
      <p>Reference ID: {reference}</p>
    </div>
  );
}

export default PaymentSuccess;
