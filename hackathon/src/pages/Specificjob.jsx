import React from "react";
import { useLocation } from "react-router-dom"; // Import your job data array
import { data } from "../data";
const Specificjob = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("id");

  // Find the job details using the ID
  const jobDetails = data.find((job) => job.id === Number(jobId));

  if (!jobDetails) {
    return <p className="text-center text-red-500">Job not found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{jobDetails.heading}</h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default Specificjob;
