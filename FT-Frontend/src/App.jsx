import './App.css'
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
