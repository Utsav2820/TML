import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import FormPage from "./pages/FormPage"; // Keep this import for the dynamic form page

// Logos (assuming these paths are correct relative to App.js)
import tataLogo from "./assets/Tata-logo.png";
import tataQuoteLogo from "./assets/tata_quote_logo.png";
import tataItLogo from "./assets/tata_it_logo.png";

// --- IMPORTANT: NO BACKEND MODULES (mysql2, express, dotenv, cors, fs, path, etc.) ARE IMPORTED HERE ---
// These modules belong ONLY in your backend (server.js)

// Dashboard component - This handles the factory and machine selection
const Dashboard = () => {
  const [factories, setFactories] = useState([]);
  const [machines, setMachines] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Fetch factories on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/factories")
      .then((res) => {
        setFactories(res.data);
      })
      .catch((error) => {
        console.error("Error fetching factories:", error);
        alert("Failed to load factories. Please check the server connection.");
      });
  }, []);

  // Fetch machines when selectedFactory changes
  useEffect(() => {
    if (selectedFactory) {
      axios
        .get(`http://localhost:5000/api/machines/${selectedFactory}`)
        .then((res) => {
          setMachines(res.data);
        })
        .catch((error) => {
          console.error(
            `Error fetching machines for factory ${selectedFactory}:`,
            error
          );
          alert("Failed to load machines. Please try again.");
        });
    } else {
      setMachines([]); // Clear machines if no factory is selected
    }
  }, [selectedFactory]);

  // Handler for the submit button
  const handleSubmit = () => {
    if (!selectedFactory || !selectedMachine) {
      alert("Please select both Factory and Machine.");
      return;
    }

    // Find the name of the selected factory (e.g., "VEHICLE FACTORY 1")
    const factoryName = factories.find(
      (f) => f.id === parseInt(selectedFactory)
    )?.name;

    if (!factoryName) {
      alert("Selected factory not found. Please refresh.");
      return;
    }

    // Correctly extract the "VFx" part (e.g., "VEHICLE FACTORY 1" -> "VF1")
    const areaParts = factoryName.split(" ");
    const area = `VF${areaParts[2]}`;

    // The 'machine' string MUST match the second part of the keys in FormPage's formComponentMap
    const machine = selectedMachine; // e.g., "AC FILLING MACHINE"

    // Navigate to the generic FormPage, passing the 'area' and 'machine' as state.
    navigate("/form", { state: { area, machine } });
  };

  return (
    <div className="min-h-screen bg-[#e6f0f8] text-white">
      <div className="w-full max-w-[1400px] min-h-screen mx-auto bg-[#212122] shadow-lg flex flex-col overflow-hidden">
        {/* Header - UI remains exactly the same */}
        <header className="bg-[#053971] px-6 py-4 flex justify-between items-center shadow-md">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">TATA MOTORS</h1>
            <p className="text-sm md:text-base opacity-90 -mt-1">
              Connecting Aspirations
            </p>
          </div>
          <img
            src={tataLogo}
            alt="Tata Logo"
            className="h-[50px] md:h-[100px] bg-white rounded-md p-2 shadow-md"
          />
        </header>

        {/* Title - UI remains exactly the same */}
        <div className="bg-blue-600 text-center py-3">
          <h2 className="text-white text-lg md:text-xl font-semibold">
            VEHICLE DATA TRACEABILITY PORTAL
          </h2>
        </div>

        {/* Main Content (Dropdowns and Button) - UI remains exactly the same */}
        <main className="flex-grow flex flex-col items-center justify-center p-6 relative">
          {/* Watermark - UI remains exactly the same */}
          <img
            src={tataItLogo}
            alt="Watermark"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] opacity-80 rounded-full pointer-events-none z-0"
          />

          {/* Dropdowns - UI remains exactly the same */}
          <div className="z-10 flex flex-col md:flex-row gap-[400px] mt-10">
            <select
              value={selectedFactory}
              onChange={(e) => setSelectedFactory(e.target.value)}
              className="w-72 bg-black text-white border-2 border-white px-4 py-3 rounded-md text-lg"
            >
              <option value="">SELECT FACTORY</option>
              {factories.map((factory) => (
                <option key={factory.id} value={factory.id}>
                  {factory.name}
                </option>
              ))}
            </select>

            <select
              value={selectedMachine}
              onChange={(e) => setSelectedMachine(e.target.value)}
              className="w-72 bg-black text-white border-2 border-white px-4 py-3 rounded-md text-lg"
              disabled={!selectedFactory}
            >
              <option value="">SELECT MACHINE</option>
              {machines.map((machine) => (
                <option key={machine.id} value={machine.name}>
                  {machine.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button - UI remains exactly the same */}
          <div className="z-10 mt-80">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded shadow mb-10"
            >
              SUBMIT
            </button>
          </div>
        </main>

        {/* Footer - UI remains exactly the same */}
        <footer className="text-center px-4 py-8">
          <img
            src={tataQuoteLogo}
            alt="Tata Quote"
            className="w-full max-w-[90%] md:max-w-[40%] mx-auto"
          />
        </footer>
      </div>
    </div>
  );
};

// Routing Setup
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the Dashboard (Home page) */}
        <Route path="/" element={<Dashboard />} />
        {/* Single dynamic route for FormPage */}
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
};

export default App;
