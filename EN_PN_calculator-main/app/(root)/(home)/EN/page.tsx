"use client";

import React, { useState, useEffect } from "react";
import NextStepButton from "@/components/NextStepButton";

const StressANDTDEEpage: React.FC = () => {
  const [stressFactor, setStressFactor] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>(''); 
  const [bmr, setBmr] = useState<number | null>(null);
  const [patientName, setPatientName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  
  // New state variables for nutrient values
  const [nutrientValues, setNutrientValues] = useState<{
    carbohydrate: number | null,
    protein: number | null,
    fats: number | null,
    fatVolume: number | null,
    fluidReq: number | null
  }>({
    carbohydrate: null,
    protein: null,
    fats: null,
    fatVolume: null,
    fluidReq: null
  });

  const options = [
    { label: "Normal/No stress (1.0)", range: [1.0, 1.0] },
    { label: "Minor Surgery (1.3 - 1.5)", range: [1.3, 1.5] },
    { label: "Moderate Surgery (1.2 - 1.4)", range: [1.2, 1.4] },
    { label: "Major Surgery (1.3 - 1.5)", range: [1.3, 1.5] },
    { label: "Burns (1.5 - 1.8)", range: [1.5, 1.8] },
    { label: "Severe Burn (1.8 - 2.0)", range: [1.8, 2.0] },
    { label: "Liver Issue (1.2 - 2.0)", range: [1.6, 1.6] },
    { label: "Renal Issues (1.2 - 2.0)", range: [1.2, 1.5] },
    { label: "Lung Issues (1.2 - 2.0)", range: [1.2, 1.5] },
  ];
  

  const calculateBMR = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseFloat(age);

    if (!isNaN(weightNum) && !isNaN(heightNum) && !isNaN(ageNum)) {
      return gender === "Male"
        ? 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
        : gender === "Female"
        ? 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161
        : null;
    }
    return null;
  };

  const calculateTDEE = () => {
    const factor = parseFloat(stressFactor);
    if (!bmr || isNaN(factor)) return null;
    return bmr * factor;
  };

  const calculateNutrients = (tdee: number | null) => {
    if (!tdee) return null;

    const carbohydrate = (tdee * 0.50) / 4;
    const protein = (tdee * 0.2) / 4;
    const fats = (tdee * 0.3) / 9;
    const fatVolume = fats * 1.1;
    const fluidReq = parseFloat(weight) * 30;

    return { carbohydrate, protein, fats, fatVolume, fluidReq };
  };

  const handleSubmit = () => {
    if (patientName && age && height && weight && gender) {
      const calculatedBMR = calculateBMR();
      if (calculatedBMR !== null) {
        setBmr(calculatedBMR);
        localStorage.setItem(
          "patientData",
          JSON.stringify({ patientName, age, height, weight, gender, bmr: calculatedBMR })
        );
      } else {
        alert("Please enter valid numerical values.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("patientData");
    if (storedData) {
      const { patientName, age, height, weight, gender, bmr } = JSON.parse(storedData);
      setPatientName(patientName);
      setAge(age);
      setHeight(height);
      setWeight(weight);
      setGender(gender);
      setBmr(bmr);
    }
  }, []);

  const tdee = calculateTDEE();

  const validateStressFactor = () => {
    const selected = options.find(option => option.label === selectedCondition);
    if (selected && (parseFloat(stressFactor) < selected.range[0] || parseFloat(stressFactor) > selected.range[1])) {
      alert(`Please enter a valid stress factor between ${selected.range[0]} and ${selected.range[1]}.`);
    }
  };

  const handleCalculate = () => {
    if (!tdee) {
      alert("Please calculate TDEE first.");
      return;
    }
    
    const values = calculateNutrients(tdee);
    if (values) {
      setNutrientValues(values); // Set nutrient values in state
      const { carbohydrate, protein, fats, fatVolume, fluidReq } = values;
      // alert(`Carbohydrates: ${carbohydrate.toFixed(2)}g, Proteins: ${protein.toFixed(2)}g, Fats: ${fats.toFixed(2)}g, Fat Volume: ${fatVolume.toFixed(2)}ml, Fluid Requirement: ${fluidReq.toFixed(2)}ml`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gradient-to-b from-gray-800 to-gray-900">
      <header className="bg-gray-900 text-white p-4 text-center shadow-lg">
        <h1 className="text-white font-bold text-3xl">EN</h1>
        <h1 className="text-3xl font-bold">Patient Information & TDEE Calculation</h1>
      </header>

      <main className="flex-grow overflow-y-auto flex items-center justify-center">
        <div className="flex flex-col gap-6 bg-gray-700 p-10 rounded-lg shadow-2xl">
          <div className="flex flex-col items-center gap-4">
            <label className="font-semibold text-lg text-white">Name of Patient:</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Patient Name"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <label className="font-semibold text-lg text-white">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Age"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <label className="font-semibold text-lg text-white">Height (cm):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Height in cm"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <label className="font-semibold text-lg text-white">Weight (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Weight in kg"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="gender" className="font-semibold text-lg text-white">Gender:</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white p-3 rounded-lg font-semibold "
          >
            Submit
          </button>

          {bmr !== null && (
            <div className="mt-4 text-center text-white">
              <p className="text-xl">BMR: {bmr.toFixed(2)} kcal/day</p>
            </div>
          )}

          <div className="flex flex-col items-center gap-4 mt-4">
            <label htmlFor="condition" className="font-semibold text-lg text-white">Select Stress Condition:</label>
            <select
              value={selectedCondition}
              onChange={(e) => {
                setSelectedCondition(e.target.value);
                const selected = options.find(option => option.label === e.target.value);
                if (selected) {
                  setStressFactor(selected.range[0].toString());
                }
              }}
              className="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Condition</option>
              {options.map(option => (
                <option key={option.label} value={option.label}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center gap-4">
            <label className="font-semibold text-lg text-white">Stress Factor:</label>
            <input
              type="number"
              value={stressFactor}
              onChange={(e) => setStressFactor(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Stress Factor"
            />
          </div>

          <div className="text-white flex flex-col" style={{ marginTop: "10px" }}>
            <button onClick={handleCalculate} className="bg-green-600 text-white p-3 rounded-lg font-semibold">
              Calculate Nutrients
            </button>
          </div>

          {/* Displaying the nutrient values */}
          {nutrientValues.carbohydrate !== null && (
            <div className="mt-4 text-center text-white bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-2xl font-bold text-purple-400 mb-4">Nutrient Values</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg transition-transform transform hover:scale-105 shadow-md">
                  <p className="text-lg font-semibold">Carbohydrates:</p>
                  <p className="text-xl font-bold">{nutrientValues.carbohydrate.toFixed(2)}g</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg transition-transform transform hover:scale-105 shadow-md">
                  <p className="text-lg font-semibold">Proteins:</p>
                  <p className="text-xl font-bold">{nutrientValues.protein?.toFixed(2)}g</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg transition-transform transform hover:scale-105 shadow-md">
                  <p className="text-lg font-semibold">Fats:</p>
                  <p className="text-xl font-bold">{nutrientValues.fats?.toFixed(2)}g</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg transition-transform transform hover:scale-105 shadow-md">
                  <p className="text-lg font-semibold">Fat Volume:</p>
                  <p className="text-xl font-bold">{nutrientValues.fatVolume?.toFixed(2)}ml</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg transition-transform transform hover:scale-105 shadow-md">
                  <p className="text-lg font-semibold">Fluid Requirement:</p>
                  <p className="text-xl font-bold">{nutrientValues.fluidReq?.toFixed(2)}ml</p>
                </div>
              </div>
            </div>
          )}
          <NextStepButton />
        </div>
      </main>
    </div>
  );
};

export default StressANDTDEEpage;
