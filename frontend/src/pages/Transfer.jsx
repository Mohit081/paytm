import React, { useState } from "react";
import { FaPaperPlane, FaUserFriends } from "react-icons/fa";
import { useUser } from "../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TransferMoney = () => {
  const [amount, setAmount] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const { sender } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) {
      alert("Please enter a valid amount.");
      return;
    }

    const data = {
      amount: amount,
      to: sender.userId,
    };

    const response = await axios.post(
      "http://localhost:3000/api/v1/account/transfer",

      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        data
      },

    );

    // console.log(response);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-blue-200 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex items-center space-x-3 mb-6">
          <FaUserFriends className="text-3xl text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Transfer Money</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Friend Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Friend's Name
            </label>
            <input
              type="text"
              value={sender.name}
              readOnly
              className="mt-1 w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount (₹)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to send"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            <FaPaperPlane className="mr-2" />
            Send ₹{amount || "0"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferMoney;
