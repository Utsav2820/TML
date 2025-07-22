// client/src/FormPage.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const FormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { area, machine } = location.state || {};

  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        area,
        machine,
        ...formData,
      };

      const res = await axios.post("http://localhost:5000/api/submit", payload);

      if (res.status === 200) {
        alert("✅ Data submitted successfully!");
        navigate("/"); // redirect back to home/dashboard
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("❌ Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Enter Form Details</h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Field 1</label>
          <input
            type="text"
            name="field1"
            value={formData.field1}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Field 1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Field 2</label>
          <input
            type="text"
            name="field2"
            value={formData.field2}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Field 2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
