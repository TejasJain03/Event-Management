import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import SignupPage from "./components/userPages/SignupPage";
import LoginPage from "./components/userPages/LoginPage";
import AllEvent from "./components/eventPages/AllEvents";
import UpdateEvent from "./components/eventPages/UpdateEvent";
import CreateEvent from "./components/eventPages/CreateEvent";
import UserEvents from "./components/userPages/UserEvents";
import ManageUserEvent from "./components/userPages/ManageUserEvent";
import AboutEvent from "./components/eventPages/AboutEvent";
import BookTicket from "./components/eventPages/BookTicket";
import PaymentConfirm from "./components/paymentPages/PaymentConfirm";
import PaymentSuccess from "./components/paymentPages/PaymentSuccess";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showuserevents" element={<UserEvents />} />
        <Route path="/aboutevent/:id" element={<AboutEvent />} />
        <Route path="/manageevent" element={<ManageUserEvent />} />
        <Route path="/booktickets" element={<BookTicket />} />
        <Route
          path="/paymentconfirmation/:eventId"
          element={<PaymentConfirm />}
        />
        <Route path="/paymentsuccess/:reference" element={<PaymentSuccess />} />
        <Route path="/updateevent/:eventId" element={<UpdateEvent />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/showallevent" element={<AllEvent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
  
export default App;
