// src/components/forms/CoolantFillingVF2.js

import React, { useState } from "react";
import axios from "axios";

const CoolantFillingVF2 = () => {
  const [formData, setFormData] = useState({
    date_time: "",
    CL_VIN: "",
    CL_VC: "",
    CL_AIRING_ACTUAL: "",
    CL_AIRING_LEAK_ACTUAL: "",
    CL_AIRING_LEAK_HOLD: "",
    CL_AIR_VENT_ACTUAL: "",
    CL_VACUUM_ACTUAL: "",
    CL_VACUUM_TIME: "",
    CL_VACUUM_LEAK_ACTUAL: "",
    CL_VACUUM_CHECK_TIME: "",
    CL_REVACUUM_ACTUAL: "",
    CL_REVACUUM_TIME: "",
    CL_OIL_FILLING_PRESSURE: "",
    CL_OIL_ACTUAL_QTY: "",
    CL_OIL_FILLING_ACTUAL: "",
    CL_AUX_TANK_FILLED: "",
    CL_CYCLE_TIME: "",
    CL_PROCESS_COMPLETE: "",
    CL_RESULT: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/vf2-coolant-filling", formData);
      setSubmitMessage("✅ Data submitted successfully!");
      setFormData({
        date_time: "",
        CL_VIN: "",
        CL_VC: "",
        CL_AIRING_ACTUAL: "",
        CL_AIRING_LEAK_ACTUAL: "",
        CL_AIRING_LEAK_HOLD: "",
        CL_AIR_VENT_ACTUAL: "",
        CL_VACUUM_ACTUAL: "",
        CL_VACUUM_TIME: "",
        CL_VACUUM_LEAK_ACTUAL: "",
        CL_VACUUM_CHECK_TIME: "",
        CL_REVACUUM_ACTUAL: "",
        CL_REVACUUM_TIME: "",
        CL_OIL_FILLING_PRESSURE: "",
        CL_OIL_ACTUAL_QTY: "",
        CL_OIL_FILLING_ACTUAL: "",
        CL_AUX_TANK_FILLED: "",
        CL_CYCLE_TIME: "",
        CL_PROCESS_COMPLETE: "",
        CL_RESULT: "",
      });
    } catch (error) {
      setSubmitMessage("❌ Submission failed. Try again.");
      console.error("Error:", error);
    }
  };

  const formStyle = {
    maxWidth: "750px",
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
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={formStyle}>
      <h2>VF2 - Coolant Filling Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} style={fieldStyle}>
            <label htmlFor={key} style={labelStyle}>
              {key.replace(/_/g, " ")}
            </label>
            <input
              type={key === "date_time" ? "datetime-local" : "text"}
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

export default CoolantFillingVF2;
