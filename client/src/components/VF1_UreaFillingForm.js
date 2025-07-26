import React, { useState } from "react";
import axios from "axios";

const UreaFillingVF1 = () => {
  const [formData, setFormData] = useState({
    VC_No: "",
    VIN_No: "",
    Set_Quantity: "",
    Actual_Quantity: "",
    Set_Process_Time: "",
    Actual_Process_Time: "",
    Result: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/vf1-urea-filling", formData);
      setSubmitMessage("✅ Data submitted successfully!");
      setFormData({
        VC_No: "",
        VIN_No: "",
        Set_Quantity: "",
        Actual_Quantity: "",
        Set_Process_Time: "",
        Actual_Process_Time: "",
        Result: "",
      });
    } catch (error) {
      setSubmitMessage("❌ Submission failed. Try again.");
    }
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f8f8f8",
  };

  const fieldStyle = { marginBottom: "15px" };
  const labelStyle = {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  };
  const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };
  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
  };

  return (
    <div style={formStyle}>
      <h2>VF1 - Urea Filling Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div style={fieldStyle} key={key}>
            <label style={labelStyle}>{key.replace(/_/g, " ")}</label>
            <input
              type="text"
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

export default UreaFillingVF1;
