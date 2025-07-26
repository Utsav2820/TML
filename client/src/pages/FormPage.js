import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// --- Import all 16 specific form components ---
// !!! CRITICAL: These import names MUST EXACTLY MATCH your actual file names.
// Assuming files are in 'src/components/' (e.g., src/components/VF1_ACFillingForm.js)

// VF1 Forms
import VF1_ACFillingForm from "../components/VF1_ACFillingForm";
import VF1_ClutchFillingForm from "../components/VF1_ClutchFillingForm";
import VF1_CoolantProcessForm from "../components/VF1_CoolantProcessForm";
import VF1_PowerSteeringForm from "../components/VF1_PowerSteeringForm";
import VF1_UreaFillingForm from "../components/VF1_UreaFillingForm";

// VF2 Forms
import VF2_ACFillingForm from "../components/VF2_ACFillingForm";
import VF2_ClutchFillingForm from "../components/VF2_ClutchFillingForm";
import VF2_CoolantProcessForm from "../components/VF2_CoolantProcessForm";
import VF2_PowerSteeringForm from "../components/VF2_PowerSteeringForm";
import VF2_UreaFillingForm from "../components/VF2_UreaFillingForm";

// VF3 Forms
import VF3_ACFillingForm from "../components/VF3_ACFillingForm";
import VF3_ClutchFillingForm from "../components/VF3_ClutchFillingForm";
import VF3_CoolantProcessForm from "../components/VF3_CoolantProcessForm";
import VF3_PowerSteeringForm from "../components/VF3_PowerSteeringForm";
import VF3_UreaFillingForm from "../components/VF3_UreaFillingForm";
import VF3_DieselFillingForm from "../components/VF3_DieselFillingForm"; // VF3 specific form

// --- Component Mapping ---
// This map links the "area" (VFx) and "machine" names to their respective React components.
// The keys here must exactly match the combined strings generated in App.js's Dashboard.
const formComponentMap = {
  // VF1
  "VF1-AC FILLING MACHINE": VF1_ACFillingForm,
  "VF1-CLUTCH OIL FILLING MACHINE": VF1_ClutchFillingForm,
  "VF1-COOLANT OIL FILLING MACHINE": VF1_CoolantProcessForm,
  "VF1-POWER STEERING OIL FILLING MACHINE": VF1_PowerSteeringForm,
  "VF1-UREA FILLING MACHINE": VF1_UreaFillingForm,

  // VF2
  "VF2-AC FILLING MACHINE": VF2_ACFillingForm,
  "VF2-CLUTCH OIL FILLING MACHINE": VF2_ClutchFillingForm,
  "VF2-COOLANT OIL FILLING MACHINE": VF2_CoolantProcessForm,
  "VF2-POWER STEERING OIL FILLING MACHINE": VF2_PowerSteeringForm,
  "VF2-UREA FILLING MACHINE": VF2_UreaFillingForm,

  // VF3
  "VF3-AC FILLING MACHINE": VF3_ACFillingForm,
  "VF3-CLUTCH OIL FILLING MACHINE": VF3_ClutchFillingForm,
  "VF3-COOLANT OIL FILLING MACHINE": VF3_CoolantProcessForm,
  "VF3-POWER STEERING OIL FILLING MACHINE": VF3_PowerSteeringForm,
  "VF3-UREA FILLING MACHINE": VF3_UreaFillingForm,
  "VF3-DIESEL OIL FILLING MACHINE": VF3_DieselFillingForm,
};

const FormPage = () => {
  const location = useLocation(); // Hook to access the current location object
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Extract 'area' and 'machine' from the navigation state
  const { area, machine } = location.state || {}; // Default to empty object if state is null/undefined

  // Construct the key to look up the component in the map
  const formKey = `${area}-${machine}`;

  // Get the component from the map
  const SpecificForm = formComponentMap[formKey];

  // Basic styling for the container to center the form
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // Take full viewport height
    backgroundColor: "#f0f2f5", // Light background color
    padding: "20px",
  };

  const errorMessageStyle = {
    textAlign: "center",
    color: "#d32f2f",
    backgroundColor: "#ffebee",
    border: "1px solid #ef9a9a",
    borderRadius: "8px",
    padding: "20px",
    margin: "50px auto",
    maxWidth: "500px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  if (!area || !machine) {
    // If state is missing, it means direct access or an error in navigation
    return (
      <div style={containerStyle}>
        <div style={errorMessageStyle}>
          <h2>Error: Form Not Found</h2>
          <p>
            It seems you've navigated to this page without selecting a factory
            and machine.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!SpecificForm) {
    // If a valid area/machine was passed but no component found in the map
    return (
      <div style={containerStyle}>
        <div style={errorMessageStyle}>
          <h2>Error: Form Component Not Found</h2>
          <p>
            No form component found for: <strong>Factory: {area}</strong> and{" "}
            <strong>Machine: {machine}</strong>.
          </p>
          <p>
            Please check the `formComponentMap` in `FormPage.js` and ensure the
            component is imported correctly.
          </p>
          <p>
            Also, verify the spelling of machine names in your dropdowns matches
            the `formComponentMap`.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // If a valid component is found, render it
  return (
    <div style={containerStyle}>
      <SpecificForm />
    </div>
  );
};

export default FormPage;
