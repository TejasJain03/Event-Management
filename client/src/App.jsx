import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import SignupPage from "./components/userPages/SignupPage";
import LoginPage from "./components/userPages/LoginPage";
import AllEvent from "./components/eventPages/AllEvents";
import UpdateEvent from "./components/eventPages/UpdateEvent";
import CreateEvent from "./components/eventPages/CreateEvent";
import UserEvents from "./components/userPages/UserEvents";
import ManageUserEvent from "./components/userPages/ManageUserEvent";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/showuserevents" element={<UserEvents />} />
          <Route path="/userevent" element={<ManageUserEvent />} />
          <Route path="/updateevent" element={<UpdateEvent />} />
          <Route path="/createevent" element={<CreateEvent />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/showallevent" element={<AllEvent />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
