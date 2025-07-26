// src/components/forms/ACFillingVF3.js

import React, { useState } from "react";
import axios from "axios";

const ACFillingVF3 = () => {
  const [formData, setFormData] = useState({
    AC_VIN: "",
    AC_Pressure_Actual: "",
    AC_Pressure_Prefill_Actual: "",
    AC_Pressure_Decay: "",
    AC_Vacuum_Actual: "",
    AC_Vacuum_Actual_Time: "",
    AC_Leak_Vacuum_Actual: "",
    AC_Leak_Vacuum_Result: "",
    AC_Leak_Vacuum_Actual_Time: "",
    AC_Vacuum2_Actual: "",
    AC_Vacuum2_Actual_Time: "",
    AC_Filling_Quantity_Actual: "",
    AC_Filling_Time_Actual: "",
    AC_Cycle_Time_Actual: "",
    AC_RESULT: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/vf3-ac-filling", formData);
      setSubmitMessage("✅ Data submitted successfully!");
      setFormData({
        AC_VIN: "",
        AC_Pressure_Actual: "",
        AC_Pressure_Prefill_Actual: "",
        AC_Pressure_Decay: "",
        AC_Vacuum_Actual: "",
        AC_Vacuum_Actual_Time: "",
        AC_Leak_Vacuum_Actual: "",
        AC_Leak_Vacuum_Result: "",
        AC_Leak_Vacuum_Actual_Time: "",
        AC_Vacuum2_Actual: "",
        AC_Vacuum2_Actual_Time: "",
        AC_Filling_Quantity_Actual: "",
        AC_Filling_Time_Actual: "",
        AC_Cycle_Time_Actual: "",
        AC_RESULT: "",
      });
    } catch (error) {
      setSubmitMessage("❌ Submission failed. Try again.");
      console.error("Error submitting form:", error);
    }
  };

  const formStyle = {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  };

  const fieldStyle = {
    marginBottom: "15px",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "bold",
    marginBottom: "6px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={formStyle}>
      <h2>VF3 - AC Filling Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} style={fieldStyle}>
            <label htmlFor={key} style={labelStyle}>
              {key.replace(/_/g, " ")}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
        ))}
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
        {submitMessage && <p>{submitMessage}</p>}
      </form>
    </div>
  );
};

export default ACFillingVF3;
