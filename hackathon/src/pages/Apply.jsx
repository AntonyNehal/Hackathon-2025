import React, { useState } from "react";

function Apply() {
  const [workExperience, setWorkExperience] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [extraQualifications, setExtraQualifications] = useState([]);
  const [aadhaar, setAadhaar] = useState("");
  const [category, setCategory] = useState("");
  const [scoreCard, setScoreCard] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [marks, setMarks] = useState(""); // State for marks

  // Handlers for Work Experience
  const handleAddExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        organization: "",
        role: "",
        field: "",
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

    const formData = new FormData();
    formData.append("aadhaar", aadhaar);
    formData.append("category", category);
    formData.append("scoreCard", scoreCard);
    formData.append("documents", documents);
    formData.append("marks", marks); // Include marks in submission

    workExperience.forEach((exp, index) =>
      formData.append(`workExperience[${index}]`, JSON.stringify(exp))
    );

    certifications.forEach((cert, index) =>
      formData.append(`certifications[${index}]`, JSON.stringify(cert))
    );

    extraQualifications.forEach((qual, index) =>
      formData.append(`extraQualifications[${index}]`, JSON.stringify(qual))
    );

    fetch("/api/jrf-applications", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Application submitted successfully:", data);
        alert("Application submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting application:", error);
        alert(
          "An error occurred while submitting the application. Please try again later."
        );
      });
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
        {/* Aadhaar Number */}
        <div className="mb-4">
          <label
            htmlFor="aadhaar"
            className="block text-sm font-medium text-gray-700"
          >
            Aadhaar Number
          </label>
          <input
            type="text"
            id="aadhaar"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Select Category</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>

        {/* Scorecard */}
        <div className="mb-4">
          <label
            htmlFor="scoreCard"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Score Card
          </label>
          <input
            type="file"
            id="scoreCard"
            onChange={(e) => setScoreCard(e.target.files[0])}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Documents */}
        <div className="mb-4">
          <label
            htmlFor="documents"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Supporting Documents
          </label>
          <input
            type="file"
            id="documents"
            multiple
            onChange={(e) => setDocuments(e.target.files)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Work Experience */}
        <div>
          <h2 className="text-lg font-semibold mt-4">Work Experience</h2>
          {workExperience.map((exp, index) => (
            <div key={index} className="border p-4 mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Organization
              </label>
              <input
                type="text"
                value={exp.organization}
                onChange={(e) =>
                  handleExperienceChange(index, "organization", e.target.value)
                }
                className="mt-1 p-2 w-full border rounded-md"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Role
              </label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) =>
                  handleExperienceChange(index, "role", e.target.value)
                }
                className="mt-1 p-2 w-full border rounded-md"
              />

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Field of Work
              </label>
              <select
                value={exp.field}
                onChange={(e) =>
                  handleExperienceChange(index, "field", e.target.value)
                }
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select Field</option>
                <option value="Research">Research</option>
                <option value="Development">Development</option>
                <option value="Data Analysis">Data Analysis</option>
                <option value="Teaching">Teaching</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Years of Experience
              </label>
              <select
                value={exp.field}
                onChange={(e) =>
                  handleExperienceChange(index, "field", e.target.value)
                }
                className="mt-1 p-2 w-half border rounded-md"
              >
                <option value="">0</option>
                <option value="Research">1-3</option>
                <option value="Development">4-7</option>
                <option value="Data Analysis">7+</option>
                <option value="Teaching">Teaching</option>
              </select>

              <button
                type="button"
                onClick={() => handleRemoveExperience(index)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove Experience
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

        {/* Marks */}
        <div className="mb-4">
          <label
            htmlFor="marks"
            className="block text-sm font-medium text-gray-700"
          >
            SSB exam marks
          </label>
          <input
            type="number"
            id="marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default Apply;
