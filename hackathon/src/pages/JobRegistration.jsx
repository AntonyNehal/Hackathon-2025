import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const JobRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    highschool: { board: "", year: "", marks: "" },
    intermediate: { board: "", year: "", marks: "" },
    graduation: { board: "", year: "", marks: "" },
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Form submitted successfully!");
        console.log(data);
        navigate("/job");
      } else {
        alert(data.message || "Error submitting the form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-yellow-500 mb-4">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname || ""}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname || ""}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob || ""}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                value={formData.nationality || ""}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  if (value.length <= 10) {
                    setFormData({ ...formData, phone: value });
                  }
                }}
                pattern="[0-9]{10}"
                maxLength="10"
                className="p-3 border border-gray-300 rounded-md w-full"
                required
              />

              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full bg-white"
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-yellow-500 mb-4">
              ADDRESS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address || ""}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city || ""}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state || ""}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode || ""}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>

          {/* Academic Qualification Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-yellow-500 mb-4">
              ACADEMIC QUALIFICATION
            </h3>
            {["highschool", "intermediate", "graduation"].map((level) => (
              <div key={level} className="grid grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder={level.charAt(0).toUpperCase() + level.slice(1)}
                  disabled
                  className="p-3 border border-gray-300 rounded-md w-full bg-gray-100"
                />
                <input
                  type="text"
                  name={`${level}.board`}
                  placeholder="Board/University"
                  value={formData[level].board || ""}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name={`${level}.year`}
                  placeholder="Year of Passing"
                  value={formData[level].year || ""}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name={`${level}.marks`}
                  placeholder="Marks"
                  value={formData[level].marks || ""}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
              </div>
            ))}
          </div>

          {/* Password Section */}
          <div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password:
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password || ""}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Re-enter Password:
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword || ""}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobRegistration;
