import React, { useState } from "react";

function Jobapply() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workExperience, setWorkExperience] = useState([]);

  const handleAddExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        organization: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleRemoveExperience = (index) => {
    setWorkExperience(workExperience.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index][field] = value;
    setWorkExperience(updatedWorkExperience);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      workExperience,
    };
    console.log(formData); // For demonstration purposes
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Junior Research Fellow Application
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />

            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />

            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mt-4">Work Experience</h2>
          {workExperience.map((exp, index) => (
            <div key={index} className="border p-4 mb-4">
              <label
                htmlFor={`organization-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Organization
              </label>
              <input
                type="text"
                id={`organization-${index}`}
                value={exp.organization}
                onChange={(e) =>
                  handleExperienceChange(index, "organization", e.target.value)
                }
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />

              <label
                htmlFor={`role-${index}`}
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Role
              </label>
              <input
                type="text"
                id={`role-${index}`}
                value={exp.role}
                onChange={(e) =>
                  handleExperienceChange(index, "role", e.target.value)
                }
                className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => handleRemoveExperience(index)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddExperience}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Work Experience
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default Jobapply;
