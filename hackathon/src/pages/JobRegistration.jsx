import React, { useState } from "react";

const JobRegistration = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    highschool: { board: "", year: "", marks: "" },
    intermediate: { board: "", year: "", marks: "" },
    graduation: { board: "", year: "", marks: "" },
    termsAccepted: false,
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

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    alert("Form submitted successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                value={formData.address}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
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
                  value={formData[level].board}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name={`${level}.year`}
                  placeholder="Year of Passing"
                  value={formData[level].year}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name={`${level}.marks`}
                  placeholder="% of marks"
                  value={formData[level].marks}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
              </div>
            ))}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={handleCheckboxChange}
              className="w-5 h-5 border-gray-300 rounded-md"
            />
            <label className="text-gray-700 text-sm">
              All Terms and Conditions
            </label>
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
