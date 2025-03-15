import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiLock, FiShield, FiEdit } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { fetchAdmins, updateAdmin } from "../../components/Admin/api/adminsAPI";

const AdminSettings = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("https://www.w3schools.com/howto/img_avatar.png");
  const [password, setPassword] = useState("");
  const [permissions, setPermissions] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    // Fetch admin data on component mount
    const loadAdminData = async () => {
      try {
        const admins = await fetchAdmins();
        const currentAdmin = admins[0]; // Assuming the admin is the first one (you can adjust this logic)
        if (currentAdmin) {
          setEmail(currentAdmin.email);
          setName(currentAdmin.name || "Admin");
          setAvatar(currentAdmin.avatar || "https://www.w3schools.com/howto/img_avatar.png");
          setPermissions(currentAdmin.permissionLevel);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setMessage({ type: "error", text: "Failed to fetch admin data." });
      }
    };

    loadAdminData();
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => password.length >= 8;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAccountSave = async () => {
    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    const updatedData = {
      email,
      name,
      avatar,
    };

    try {
      await updateAdmin("adminId", updatedData); // Replace "adminId" with actual ID logic if available
      setMessage({ type: "success", text: "Account settings updated successfully" });
    } catch (error) {
      console.error("Error updating account:", error);
      setMessage({ type: "error", text: "Failed to update account settings." });
    }
  };

  const handleSecuritySave = async () => {
    if (!validatePassword(password)) {
      setMessage({ type: "error", text: "Password must be at least 8 characters long" });
      return;
    }

    const updatedData = {
      password,
    };

    try {
      await updateAdmin("adminId", updatedData); // Replace "adminId" with actual ID logic if available
      setMessage({ type: "success", text: "Security settings updated successfully" });
    } catch (error) {
      console.error("Error updating security:", error);
      setMessage({ type: "error", text: "Failed to update security settings." });
    }
  };

  return (
    <div className="min-h-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className="border-[#FF720C] text-[#FF720C] flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm sm:text-base"
            >
              <FiUser className="w-5 h-5 inline mr-2" />
              Account
            </button>
          </nav>
        </div>

        <div className="p-6">
          {message.text && (
            <div
              className={`${
                message.type === "success" ? "bg-green-50" : "bg-red-50"
              } p-4 rounded-md mb-6`}
            >
              {message.type === "success" ? (
                <FaCheckCircle className="inline w-5 h-5 text-green-400 mr-2" />
              ) : (
                <MdError className="inline w-5 h-5 text-red-400 mr-2" />
              )}
              <span
                className={message.type === "success" ? "text-green-700" : "text-red-700"}
              >
                {message.text}
              </span>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center">
              <div className="relative group cursor-pointer mb-4">
                <img
                  src={avatar}
                  alt="Admin avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="cursor-pointer">
                    <FiEdit className="w-6 h-6 text-white" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </div>
              <div className="space-y-4 w-full">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FF720C] focus:border-[#FF720C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FF720C] focus:border-[#FF720C]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleAccountSave}
              className="w-full bg-[#FF720C] text-white px-4 py-2 rounded-md hover:bg-[#e66200] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
