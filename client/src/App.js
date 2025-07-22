import React, { useState, useEffect } from "react";
import tataLogo from "./assets/Tata-logo.png";
import tataQuoteLogo from "./assets/tata_quote_logo.png";
import tataItLogo from "./assets/tata_it_logo.png";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [areaOpen, setAreaOpen] = useState(false);
  const [machineOpen, setMachineOpen] = useState(false);
  const [areas, setAreas] = useState([]); // List of areas from API
  const [selectedArea, setSelectedArea] = useState(null); // Selected area object
  const [allMachines, setAllMachines] = useState([]); // All machines from API
  const [machines, setMachines] = useState([]); // Filtered machines for selected area
  const [selectedMachine, setSelectedMachine] = useState(null);
  const navigate = useNavigate();

  // Fetch vehicle factories on mount
  useEffect(() => {
    fetch("http://localhost:5000/vehicle-factories")
      .then((res) => res.json())
      .then((data) => setAreas(data))
      .catch((err) => console.error("Failed to fetch areas", err));
  }, []);

  // Fetch machines when a factory is selected
  useEffect(() => {
    if (selectedArea) {
      fetch(`http://localhost:5000/machines/${selectedArea.id}`) // 👈 use factory ID
        .then((res) => res.json())
        .then((data) => setMachines(data))
        .catch((err) => console.error("Failed to fetch machines", err));
    } else {
      setMachines([]);
    }
  }, [selectedArea]);

  // Reset selected machine when area changes
  useEffect(() => {
    setSelectedMachine(null);
  }, [selectedArea]);

  const toggleArea = () => {
    setAreaOpen(!areaOpen);
    setMachineOpen(false);
  };

  const toggleMachine = () => {
    setMachineOpen(!machineOpen);
    setAreaOpen(false);
  };

  const closeDropdowns = () => {
    setAreaOpen(false);
    setMachineOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-[#e6f0f8] text-white"
      onClick={closeDropdowns}
    >
      {/* Container */}

      <div className="w-full max-w-[1400px] min-h-screen mx-auto bg-[#212122] shadow-lg flex flex-col overflow-hidden">
        {/* Top Header */}

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

        {/* Title Section */}

        <div className="bg-blue-600 text-center py-3">
          <h2 className="text-white text-lg md:text-xl font-semibold">
            VEHICLE DATA TRACEABILITY PORTAL
          </h2>
        </div>

        {/* Main Content */}

        <main className="flex-grow flex flex-col justify-between items-center p-6">
          {/* Dropdowns + Watermark */}

          <div className="relative w-full flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[400px] place-items-center py-16">
              {/* Watermark */}

              <img
                src={tataItLogo}
                alt="Watermark"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] w-[300px] opacity-20 rounded-full pointer-events-none z-0"
              />

              {/* Area Dropdown */}

              <div className="relative w-80 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleArea();
                  }}
                  className={`w-full bg-black text-white border-2 border-white px-4 py-3 rounded-md flex justify-between items-center text-lg ${
                    areaOpen ? "bg-gray-700 border-gray-300" : ""
                  }`}
                >
                  {selectedArea ? selectedArea.name : "SELECT AREA"}{" "}
                  <span>&#9660;</span>
                </button>
                {areaOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute left-0 mt-2 w-full bg-white text-black shadow-md border border-gray-200 z-20 rounded max-h-60 overflow-y-auto"
                  >
                    {areas.map((area) => (
                      <a
                        href="#"
                        key={area.id || area.name}
                        className="block px-4 py-2 hover:bg-gray-200 text-base"
                        onClick={() => {
                          setSelectedArea(area);
                          setAreaOpen(false);
                        }}
                      >
                        {area.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Machine Dropdown */}

              <div className="relative w-80 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMachine();
                  }}
                  className={`w-full bg-black text-white border-2 border-white px-4 py-3 rounded-md flex justify-between items-center text-lg ${
                    machineOpen ? "bg-gray-700 border-gray-300" : ""
                  }`}
                  disabled={!selectedArea}
                >
                  {selectedMachine
                    ? selectedMachine.name
                    : "MACHINE DROP DOWN MENU"}{" "}
                  <span>&#9660;</span>
                </button>
                {machineOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute left-0 mt-2 w-full bg-white text-black shadow-md border border-gray-200 z-20 rounded max-h-60 overflow-y-auto"
                  >
                    {machines.length === 0 ? (
                      <div className="px-4 py-2 text-base text-gray-500">
                        No machines found
                      </div>
                    ) : (
                      machines.map((machine) => (
                        <a
                          href="#"
                          key={machine.id}
                          className="block px-4 py-2 hover:bg-gray-200 text-base"
                          onClick={() => {
                            setSelectedMachine(machine);
                            setMachineOpen(false);
                          }}
                        >
                          {machine.name}
                        </a>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (!selectedArea || !selectedMachine) {
                alert("Please select both an area and a machine.");
                return;
              }

              // Navigate to form page with selected area and machine passed as state
              navigate("/form", {
                state: {
                  area: selectedArea,
                  machine: selectedMachine,
                },
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded shadow mt-40"
          >
            SUBMIT
          </button>

          {/* Tata Quote */}

          <footer className="text-center px-4 py-16 mt-auto">
            <img
              src={tataQuoteLogo}
              alt="Tata Quote"
              className="w-full max-w-[90%] md:max-w-[40%] mx-auto"
            />
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
