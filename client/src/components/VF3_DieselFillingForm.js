import React, { useState } from "react";
import axios from "axios";

const DieselFillingVF3 = () => {
  const [formData, setFormData] = useState({
    DL_VIN: "",
    DL_VC: "",
    DL_ACT_QTY: "",
    DL_RESULT: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/vf3-diesel-filling",
        formData
      );
      setSubmitMessage("✅ Data submitted successfully!");
      setFormData({
        DL_VIN: "",
        DL_VC: "",
        DL_ACT_QTY: "",
        DL_RESULT: "",
      });
    } catch (error) {
      setSubmitMessage("❌ Submission failed. Please try again.");
    }
  };

  const formStyle = {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "#f1f1f1",
    border: "1px solid #ccc",
    borderRadius: "12px",
    fontFamily: "Arial, sans-serif",
  };

  const fieldStyle = { marginBottom: "15px" };
  const labelStyle = {
    display: "block",
    fontWeight: "bold",
    marginBottom: "6px",
  };
  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #aaa",
  };
  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div style={formStyle}>
      <h2>VF3 - Diesel Filling Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <label style={labelStyle}>DL VIN</label>
          <input
            type="text"
            name="DL_VIN"
            value={formData.DL_VIN}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>DL VC</label>
          <input
            type="text"
            name="DL_VC"
            value={formData.DL_VC}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>DL Actual Quantity</label>
          <input
            type="number"
            step="0.01"
            name="DL_ACT_QTY"
            value={formData.DL_ACT_QTY}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>DL Result</label>
          <input
            type="text"
            name="DL_RESULT"
            value={formData.DL_RESULT}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
        {submitMessage && <p>{submitMessage}</p>}
      </form>
    </div>
  );
};

export default DieselFillingVF3;
