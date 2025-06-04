import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import TransferMoney from "./pages/Transfer";

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
