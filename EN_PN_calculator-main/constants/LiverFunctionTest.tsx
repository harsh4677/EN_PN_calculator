import React, { useState } from 'react';

interface TestValues {
  FBS: string;
  A1c: string;
  AST: string;
  Bilirubin: string;
  ALP: string;
  ALT: string;
  BUN: string;
  Albumin: string;
  Protein: string;
  Hgb: string;
  Hct: string;
  WBC: string;
  Platelets: string;
  Triglyceride: string;
  Cholesterol: string;
  LDL: string;
  HDL: string;
  pH: string;
  HCO3: string;
  Zn: string;
  Cu: string;
  Cr: string;
  Mg: string;
}

export default function LiverFunctionTest() {
  // State to hold all test values
  const [testValues, setTestValues] = useState<TestValues>({
    FBS: '',
    A1c: '',
    AST: '',
    Bilirubin: '',
    ALP: '',
    ALT: '',
    BUN: '',
    Albumin: '',
    Protein: '',
    Hgb: '',
    Hct: '',
    WBC: '',
    Platelets: '',
    Triglyceride: '',
    Cholesterol: '',
    LDL: '',
    HDL: '',
    pH: '',
    HCO3: '',
    Zn: '',
    Cu: '',
    Cr: '',
    Mg: ''
  });

  // Handle input change for medical test values
  const handleTestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTestValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Liver Function Test (LFTs) */}
      <h3 className="text-xl font-semibold text-white mb-4">Liver Function Test (LFTs)</h3>
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        <div className="flex flex-col flex-grow">
          <label className="text-lg text-white mb-1" htmlFor="AST">
            AST (U/L):
          </label>
          <input
            type="number"
            name="AST"
            value={testValues.AST}
            onChange={handleTestChange}
            required
            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter AST"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <label className="text-lg text-white mb-1" htmlFor="Bilirubin">
            Bilirubin (mg/dL):
          </label>
          <input
            type="number"
            name="Bilirubin"
            value={testValues.Bilirubin}
            onChange={handleTestChange}
            required
            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter Bilirubin"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <label className="text-lg text-white mb-1" htmlFor="ALP">
            ALP (U/L):
          </label>
          <input
            type="number"
            name="ALP"
            value={testValues.ALP}
            onChange={handleTestChange}
            required
            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter ALP"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <label className="text-lg text-white mb-1" htmlFor="ALT">
            ALT (U/L):
          </label>
          <input
            type="number"
            name="ALT"
            value={testValues.ALT}
            onChange={handleTestChange}
            required
            className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter ALT"
          />
        </div>
      </div>
    </div>
  );
}
