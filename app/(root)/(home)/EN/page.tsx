"use client";

const calculateNutrients = (tdee: number | null, weight: string, selectedCondition: string) => {
  if (!tdee || isNaN(parseFloat(weight))) return null;

  let carbohydrate = 0;
  let protein = 0;
  let fats = 0;
  let fatVolume = 0;

  switch (selectedCondition) {
    case '1.2': // Burns
      carbohydrate = (tdee * 0.55) / 4;
      protein = (tdee * 0.25) / 4;
      fats = (tdee * 0.20) / 9;
      break;
    case '1.4': // Severe Burn
      carbohydrate = (tdee * 0.60) / 4;
      protein = (tdee * 0.20) / 4;
      fats = (tdee * 0.20) / 9;
      break;
    case '1.6': // Liver Issue
      carbohydrate = (tdee * 0.55) / 4;
      protein = (tdee * 0.15) / 4;
      fats = (tdee * 0.30) / 9;
      break;
    case '1.8': // Renal Failure
      carbohydrate = (tdee * 0.50) / 4;
      protein = (tdee * 0.15) / 4;
      fats = (tdee * 0.35) / 9;
      break;
    default: // Default or unknown condition
      carbohydrate = (tdee * 0.50) / 4;
      protein = (tdee * 0.20) / 4;
      fats = (tdee * 0.30) / 9;
      break;
  }

  fatVolume = fats * 1.1;
  const fluidReq = parseFloat(weight) * 30;

  return { carbohydrate, protein, fats, fatVolume, fluidReq };
};

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NextStepButton from "@/components/NextStepButton";


const StressANDTDEEpage: React.FC = () => {
  const [stressFactor, setStressFactor] = useState<string>('');
  const [customStressFactor, setCustomStressFactor] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>(''); 
  const [bmr, setBmr] = useState<number | null>(null);

  const [patientName, setPatientName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const router = useRouter();

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
    const factor = customStressFactor || stressFactor;
    if (!bmr || !factor) {
      return null;
    }
    const parsedFactor = parseFloat(factor);
    if (isNaN(parsedFactor)) {
      return null;
    }
    return bmr * parsedFactor;
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value.split(' ')[0]; // Extract the numerical part
    setStressFactor(selectedValue);
    setSelectedCondition(selectedValue);
    setCustomStressFactor('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomStressFactor(e.target.value);
    setStressFactor(''); // Clear dropdown when custom value is used
  };

  const tdee = calculateTDEE();
  const nutrientValues = calculateNutrients(tdee, weight, selectedCondition);



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
            className="mt-4 bg-blue-600 text-white p-3 rounded-lg w-64 transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>

          {bmr !== null && (
            <div className="mt-4 text-center text-white">
              <p className="text-xl">BMR: {bmr.toFixed(2)} kcal/day</p>
            </div>
          )}

          <div className="flex flex-col items-center gap-4 mt-4">
            <label htmlFor="condition" className="font-semibold text-lg text-white">Select Stress Factor:</label>
            <select
              id="condition"
              value={stressFactor}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Condition</option>
              <option value="1.2">Burns</option>
              <option value="1.4">Severe Burn</option>
              <option value="1.6">Liver Issue</option>
              <option value="1.8">Renal Failure</option>
              <option value='1.0'>Normal/No stress (1.0)</option>
              <option value='1.1'>Minor Surgery (1.1)</option>
              <option value='1.2'>Moderate Surgery (1.2)</option>
              <option value='1.3'>Major Surgery (1.3)</option>
            </select>

            <label className="font-semibold text-lg text-white">Custom Stress Factor:</label>
            <input
              type="number"
              value={customStressFactor}
              onChange={handleCustomChange}
              className="border border-gray-300 p-3 rounded-lg w-64 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter Custom Factor"
            />
          </div>

          {nutrientValues && (
            <div className="mt-4 text-center text-white">
              <p className="text-lg">Carbohydrates: {nutrientValues.carbohydrate.toFixed(2)} g</p>
              <p className="text-lg">Proteins: {nutrientValues.protein.toFixed(2)} g</p>
              <p className="text-lg">Fats: {nutrientValues.fats.toFixed(2)} g</p>
              <p className="text-lg">Fat Volume: {nutrientValues.fatVolume.toFixed(2)} ml</p>
              <p className="text-lg">Fluid Requirement: {nutrientValues.fluidReq.toFixed(2)} ml</p>
            </div>
          )}

          <NextStepButton/>
        </div>
      </main>
    </div>
  );
};

export default StressANDTDEEpage;

