import React, { useEffect, useState } from "react";
import { FaUserCircle, FaWallet, FaSearch, FaMoneyCheck } from "react-icons/fa";
import { useUser } from "../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setSender } = useUser();
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [balance , setBalance] = useState("")

  console.log(searchUsers);

  useEffect(() => {
    const fetchBalance = async () => {
      const userBalance = await axios.post(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          }
        }
      );
      const convertbalance = userBalance.data.balance.toFixed(2)
      setBalance(convertbalance)
    };
    fetchBalance()
  },[]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await axios.get(
          "http://localhost:3000/api/v1/user/getAlluser"
        );
        // console.log(users.data.users)
        setUsers(users.data.users);
      } catch (error) {
        console.log(error, " user not fetch");
      }
    };
    fetchUser();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredUsers = async () => {
      if (searchTerm.length > 0) {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/getUser",
          {
            params: {
              filter: searchTerm,
            },
          }
        );
        setSearchUsers(response.data.user);
      }
    };
    filteredUsers();
  }, [searchTerm]);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <FaWallet className="text-2xl" />
          <h1 className="text-xl font-bold">PayFlow</h1>
        </div>
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-2xl" />
          <span className="font-medium">{`${user.firstName} ${user.lastName}`}</span>
        </div>
      </nav>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Balance Card */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex items-center space-x-4">
          <FaMoneyCheck className="text-4xl text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Your Balance</p>
            <h2 className="text-2xl font-bold text-gray-800">
              ₹{balance}
            </h2>
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Search Users
          </label>
          <div className="relative">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type a name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100 text-gray-700 text-left">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold">User</th>
                <th className="px-6 py-3 text-sm font-semibold text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(searchUsers.length > 0 ? searchUsers : users).map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <FaUserCircle className="text-2xl text-blue-500" />
                    <span className="font-medium text-gray-800">{`${u.firstName} ${u.lastName}`}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg shadow-sm text-sm font-semibold"
                      onClick={() => {
                        setSender({
                          name: u.firstName,
                          userId: u._id,
                        });
                        navigate("/transfer");
                      }}
                    >
                      Send Money
                    </button>
                  </td>
                </tr>
              ))}
              {/* {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
