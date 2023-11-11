import { useNavigate, useParams } from "react-router-dom";

function PaymentSuccess() {
  const { reference } = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center p-8 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-green-600">
          Payment Successfull{" "}
        </h1>
        <p className="font-bold">Reference ID: {reference}</p>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="p-4 mt-2 rounded-lg text-white bg-darkBlue"
        >Go back to Home</button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
