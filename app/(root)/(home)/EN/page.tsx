"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NextStepButton from "@/components/NextStepButton";

export default function EN_page() {
  // State to store form inputs
  const [patientName, setPatientName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [bmr, setBmr] = useState<number | null>(null);

  // Next.js router hook
  const router = useRouter();

  // Function to calculate BMR based on gender, weight, height, and age
  const calculateBMR = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseFloat(age);

    if (!isNaN(weightNum) && !isNaN(heightNum) && !isNaN(ageNum)) {
      if (gender === "Male") {
        return 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
      } else if (gender === "Female") {
        return 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  // Submit function
  const handleSubmit = () => {
    if (patientName && age && height && weight && gender) {
      const calculatedBMR = calculateBMR();
      if (calculatedBMR !== null) {
        setBmr(calculatedBMR);
        // Store data in localStorage
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

  // Load data from localStorage on page load
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

  // Function to handle Next Step button click
  const handleNextStep = () => {
    router.push("/next-step"); // Navigate to the next step page
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-800">
      <div className="flex flex-col gap-5 bg-gray-700 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Patient Information</h1>
        <div className="flex flex-col items-center gap-2">
          <label className="font-semibold text-white">Name of Patient:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="border p-2 rounded w-64"
            placeholder="Enter Patient Name"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="font-semibold text-white">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border p-2 rounded w-64"
            placeholder="Enter Age"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="font-semibold text-white">Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border p-2 rounded w-64"
            placeholder="Enter Height in cm"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="font-semibold text-white">Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border p-2 rounded w-64"
            placeholder="Enter Weight in kg"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="gender" className="font-semibold text-white">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border p-2 rounded w-64"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white p-2 rounded w-64"
        >
          Submit
        </button>
      </div>

      {bmr !== null && (
        <div className="mt-6 p-6 bg-emerald-950 text-white rounded-lg shadow-lg w-64 text-center font-bold">
          <h2 className="text-xl font-extrabold">Calculated BMR</h2>
          <p className="text-xl mt-2 font-bold">{bmr.toFixed(2)} kcal/day</p>
        </div>
      )}

      {/* NextStepButton positioned at bottom-right corner of the screen */}
      <div className="fixed bottom-4 right-4">
        <NextStepButton />
      </div>
    </div>
  );
}
