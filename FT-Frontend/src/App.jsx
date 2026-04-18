import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";

function App() {
  toast("It's OK");

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
