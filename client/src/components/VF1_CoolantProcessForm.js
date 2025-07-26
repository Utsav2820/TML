// src/components/forms/CoolantFillingVF1.js

import React, { useState } from "react";
import axios from "axios";

const CoolantFillingVF1 = () => {
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/vf1-coolant-filling",
        formData
      );
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
      console.error("Submission error:", error);
    }
  };

  const formStyle = {
    maxWidth: "750px",
    margin: "20px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#f2f2f2",
    boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
  };

  const fieldStyle = {
    marginBottom: "16px",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "bold",
    marginBottom: "6px",
    fontSize: "15px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #bbb",
  };

  const buttonStyle = {
    marginTop: "25px",
    padding: "12px 24px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: "center" }}>VF1 - Coolant Filling Form</h2>
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
        {submitMessage && (
          <p
            style={{
              marginTop: "15px",
              fontWeight: "bold",
              color: submitMessage.startsWith("✅") ? "green" : "red",
            }}
          >
            {submitMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default CoolantFillingVF1;
