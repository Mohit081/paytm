import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TransferMoney from "./pages/Transfer.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/transfer" element={<TransferMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
