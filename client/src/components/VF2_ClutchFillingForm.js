// src/components/forms/ClutchFillingVF2.js

import React, { useState } from "react";
import axios from "axios";

const ClutchFillingVF2 = () => {
  const [formData, setFormData] = useState({
    CT_VIN: "",
    CT_VC: "",
    CT_Pressure_Build_Actual: "",
    CT_Pressure_Stable_Actual: "",
    CT_Pressure_Leak_Actual: "",
    CT_COA_Vacuum_Actual: "",
    CT_Fine_Vacuum_Actual: "",
    CT_Vacuum_Actual: "",
    CT_Vacuum_Leak_Actual: "",
    CT_Filling_Volume_Actual: "",
    CT_Filling_Pressure_Actual: "",
    CT_Delta_Pressure_Actual: "",
    CT_Oil_Fill_Pressure_Actual: "",
    CT_Air_Vent_Actual: "",
    CT_Process_Time: "",
    CT_Result: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/vf2-clutch-filling", formData);
      setSubmitMessage("✅ Data submitted successfully!");
      setFormData({
        CT_VIN: "",
        CT_VC: "",
        CT_Pressure_Build_Actual: "",
        CT_Pressure_Stable_Actual: "",
        CT_Pressure_Leak_Actual: "",
        CT_COA_Vacuum_Actual: "",
        CT_Fine_Vacuum_Actual: "",
        CT_Vacuum_Actual: "",
        CT_Vacuum_Leak_Actual: "",
        CT_Filling_Volume_Actual: "",
        CT_Filling_Pressure_Actual: "",
        CT_Delta_Pressure_Actual: "",
        CT_Oil_Fill_Pressure_Actual: "",
        CT_Air_Vent_Actual: "",
        CT_Process_Time: "",
        CT_Result: "",
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
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={formStyle}>
      <h2>VF2 - Clutch Filling Form</h2>
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

export default ClutchFillingVF2;
