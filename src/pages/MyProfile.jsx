import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  // Function to update user profile data using API
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("username", userData.username);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      
      formData.append("password", userData.condition);
       if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  if (!userData) return null;

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
      {/* Profile Image Section */}
      <div>
        {isEdit ? (
          <label htmlFor="image" className="inline-block relative cursor-pointer ">
            <img
              className="w-36 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="User Profile"
            />
            <img
              className="w-10 absolute bottom-12 right-12"
              src={image ? "" : assets.upload_icon}
              alt="Upload Icon"
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-100 rounded " src={userData.image} alt="User Profile" />
        )}
      </div>

      {/* Name Field */}
      <div>
        <label className="block font-medium text-3xl text-[#262626] mt-4">
          Name
        </label>
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 w-full"
          type="text"
          placeholder="Enter your name"
          disabled={!isEdit}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          value={userData.name}
        />
      </div>

      <hr className="bg-[#ADADAD] h-[1px] border-none" />

      {/* Account INFORMATION Section */}
      <div>
        <p className="text-gray-600 text-xl underline mt-3 uppercase">Account INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          {/* Username */}
          <label className="font-medium text-xl">Username:</label>
          <input
            className="bg-gray-50 max-w-52 w-full text-xl"
            type="text"
            placeholder="Enter username"
            disabled={!isEdit}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }
            value={userData.username}
          />

          {/* Password */}
          <label className="font-medium text-xl">Password:</label>
          <input
            className="bg-gray-50 max-w-52 w-full text-xl"
            type="password"
            placeholder="Enter password"
            disabled={!isEdit}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, password: e.target.value }))
            }
            value={userData.password}
          />
        </div>
      </div>

      {/* CONTACT INFORMATION Section */}
      <div>
        <p className="text-gray-600 underline mt-3 text-xl">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          {/* Email */}
          <label className="font-medium text-xl">Email id:</label>
          <p className="text-blue-500 text-xl ">{userData.email}</p>

          {/* Phone */}
          <label className="font-medium text-xl">Phone:</label>
          <input
            className="bg-gray-50 max-w-52 w-full text-xl"
            type="text"
            placeholder="Enter phone number"
            disabled={!isEdit}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, phone: e.target.value }))
            }
            value={userData.phone}
          />

          {/* Address */}
          <label className="font-medium text-xl">Address:</label>
          <div>
            <input
              className="bg-gray-50 w-full mb-2 text-xl"
              type="text"
              placeholder="Address Line 1"
              disabled={!isEdit}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
              value={userData.address.line1}
            />
            <input
              className="bg-gray-50 w-full text-xl"
              type="text"
              placeholder="Address Line 2"
              disabled={!isEdit}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
              value={userData.address.line2}
            />
          </div>
        </div>
      </div>

      {/* BASIC INFORMATION Section */}
      <div>
   
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
          {/* Gender */}
          <label className="font-medium text-xl">Gender:</label>
          <select
            className="max-w-20 bg-gray-50 w-full text-lg"
            disabled={!isEdit}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, gender: e.target.value }))                                
            }
            value={userData.gender}
          >
            <option value="Not Selected text-xl">Not Selected</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* Birthday */}
          <label className="font-medium text-xl">Birthday:</label>
          <input
            className="max-w-28 bg-gray-50 w-full"
            type="date"
            disabled={!isEdit}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, dob: e.target.value }))
            }
            value={userData.dob}
          />
 <label className="font-medium text-xl">Outgoing condition</label>
<input
  className="bg-gray-50 w-full placeholder-gray-400 text-xl"
  type="text"
  placeholder="Enter your text here"
  disabled={!isEdit}
  onChange={(e) =>
    setUserData((prev) => ({ ...prev, outgoingText: e.target.value }))
  }
  value={userData.outgoingText}
/>

        </div>
      </div>

      <div className="mt-10">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="border  text-xl border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primary text-xl px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
