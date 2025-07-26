// src/components/forms/PowerSteeringVF3.js

import React, { useState } from "react";
import axios from "axios";

const PowerSteeringVF3 = () => {
  const [formData, setFormData] = useState({
    PS_VIN: "",
    PS_VC: "",
    PS_AIRING_ACTUAL: "",
    PS_AIRING_LEAK_HOLD: "",
    PS_AIRING_LEAK_ACTUAL: "",
    PS_AIR_VENT_ACTUAL: "",
    PS_VACUUM_ACTUAL: "",
    PS_VACUUM_LEAK_ACTUAL: "",
    PS_REVACUUM_ACTUAL: "",
    PS_OIL_QTY_ACTUAL: "",
    PS_OIL_PRESSURE_ACTUAL: "",
    PS_DELTA_PRESSURE_ACTUAL: "",
    PS_PROCESS_COMPLETE: "",
    PS_CYCLE_TIME: "",
    PS_RESULT: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/vf3-power-steering",
        formData
      );
      setSubmitMessage("✅ Data submitted successfully!");
      setFormData({
        PS_VIN: "",
        PS_VC: "",
        PS_AIRING_ACTUAL: "",
        PS_AIRING_LEAK_HOLD: "",
        PS_AIRING_LEAK_ACTUAL: "",
        PS_AIR_VENT_ACTUAL: "",
        PS_VACUUM_ACTUAL: "",
        PS_VACUUM_LEAK_ACTUAL: "",
        PS_REVACUUM_ACTUAL: "",
        PS_OIL_QTY_ACTUAL: "",
        PS_OIL_PRESSURE_ACTUAL: "",
        PS_DELTA_PRESSURE_ACTUAL: "",
        PS_PROCESS_COMPLETE: "",
        PS_CYCLE_TIME: "",
        PS_RESULT: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("❌ Submission failed. Try again.");
    }
  };

  const formStyle = {
    maxWidth: "750px",
    margin: "30px auto",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    backgroundColor: "#fff8e1",
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
    backgroundColor: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={formStyle}>
      <h2>VF3 - Power Steering Filling Form</h2>
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

export default PowerSteeringVF3;
