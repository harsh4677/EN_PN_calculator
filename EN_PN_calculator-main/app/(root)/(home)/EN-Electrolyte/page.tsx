"use client";
import { useState } from 'react';

// Define the types for the electrolyte and test values
interface ElectrolyteValues {
  Na: string;
  K: string;
  Cl: string;
  Ca: string;
  Mg: string;
  PO4: string;
  HCO3:string;
}

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

const CombinedForm: React.FC = () => {
  // State to hold the electrolyte values
  const [electrolytes, setElectrolytes] = useState<ElectrolyteValues>({
    Na: '',
    K: '',
    Cl: '',
    Ca: '',
    Mg: '',
    PO4: '',
    HCO3: ''
  });

  // State to hold the calculated volumes
  const [volumes, setVolumes] = useState({
    Na: 0,
    K: 0,
    Cl: 0,
    Ca: 0,
    Mg: 0,
    PO4: 0,
    HCO3: 0
  });

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

  const [submitted, setSubmitted] = useState(false);
  const [showTraceElements, setShowTraceElements] = useState(false);
  const [showMultivitamins, setShowMultivitamins] = useState(false);


  // Handle input change for electrolytes
  const handleElectrolyteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setElectrolytes(prev => ({ ...prev, [name]: value }));
  };

  // Handle input change for medical test values
  const handleTestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTestValues(prev => ({ ...prev, [name]: value }));
  };

  // Function to calculate volumes based on electrolyte values
  const calculateVolumes = () => {
    const NaVolume = (135 - parseFloat(electrolytes.Na)) / 154 * 1000;
    const KVolume = (4 - parseFloat(electrolytes.K)) * 100 / 1;
    const ClVolume = (102 - parseFloat(electrolytes.Cl)) / 154 * 1000;
    const CaVolume = (9 - parseFloat(electrolytes.Ca)) / 9.3;
    const MgVolume = (2 - parseFloat(electrolytes.Mg)) / 0.84 * 10;
    const PO4Volume = (3.5 - parseFloat(electrolytes.PO4)) / 0.84 * 10;
    const HCO3Volume = (24 - parseFloat(electrolytes.HCO3)) / 0.84 * 10;

    setVolumes({
      Na: isNaN(NaVolume) ? 0 : NaVolume,
      K: isNaN(KVolume) ? 0 : KVolume,
      Cl: isNaN(ClVolume) ? 0 : ClVolume,
      Ca: isNaN(CaVolume) ? 0 : CaVolume,
      Mg: isNaN(MgVolume) ? 0 : MgVolume,
      PO4: isNaN(PO4Volume) ? 0 : PO4Volume,
      HCO3: isNaN(HCO3Volume) ? 0 : HCO3Volume
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Electrolyte values submitted:', electrolytes);
    console.log('Medical test values submitted:', testValues);
    calculateVolumes();
    setSubmitted(true);
    // Add your submission logic here
  };

  return(
    <div className="flex justify-center items-center min-h-screen w-screen bg-gradient-to-b from-gray-800 to-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-700 p-8 rounded-lg shadow-2xl w-full max-w-7xl">
        <h1 className='text-white font-bold text-3xl'>EN</h1>
        {/* Electrolyte Input Section */}
        <h2 className="text-2xl font-bold text-center text-white mb-6">Electrolyte Input</h2>
        <div className="flex justify-between gap-4">
          {Object.keys(electrolytes).map((key) => (
            <div className="flex flex-col flex-grow" key={key}>
              <label className="text-lg text-white mb-1" htmlFor={key}>
                {key} ({key === 'Ca' || key === 'Mg' || key === 'PO4' ? 'mg/dL' : 'mEq/L'}):
              </label>
              <input
                type="number"
                name={key}
                value={electrolytes[key as keyof ElectrolyteValues]}
                onChange={handleElectrolyteChange}
                required
                className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
                placeholder={`Enter ${key} value`}
              />
            </div>
          ))}
        </div>

        {/* Medical Test Input Section */}
        <h2 className="text-2xl font-bold text-center text-white mb-6 mt-8">Medical Test Input</h2>

        {/* Blood Glucose Level */}
        <h3 className="text-xl font-semibold text-white mb-4">Blood Glucose Level</h3>
        <div className="flex flex-wrap justify-between gap-4 mb-4">
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="FBS">
              FBS (mg/dL):
            </label>
            <input
              type="number"
              name="FBS"
              value={testValues.FBS}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter FBS"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="A1c">
              A1c (HbA1c) (%):
            </label>
            <input
              type="number"
              name="A1c"
              value={testValues.A1c}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter A1c"
            />
          </div>
        </div>

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

        {/* Renal Function */}
        <h3 className="text-xl font-semibold text-white mb-4">Renal Function</h3>
        <div className="flex flex-wrap justify-between gap-4 mb-4">
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="BUN">
              BUN (mg/dL):
            </label>
            <input
              type="number"
              name="BUN"
              value={testValues.BUN}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter BUN"
            />
          </div>
        </div>

        {/* Albumin and Total Protein */}
        <h3 className="text-xl font-semibold text-white mb-4">Albumin and Total Protein</h3>
        <div className="flex flex-wrap justify-between gap-4 mb-4">
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="Albumin">
              Albumin (g/dL):
            </label>
            <input
              type="number"
              name="Albumin"
              value={testValues.Albumin}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter Albumin"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="Protein">
              Total Protein (g/dL):
            </label>
            <input
              type="number"
              name="Protein"
              value={testValues.Protein}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter Total Protein"
            />
          </div>
        </div>

        {/* Hematology */}
        <h3 className="text-xl font-semibold text-white mb-4">Hematology</h3>
        <div className="flex flex-wrap justify-between gap-4 mb-4">
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="Hgb">
              Hemoglobin (g/dL):
            </label>
            <input
              type="number"
              name="Hgb"
              value={testValues.Hgb}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter Hemoglobin"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="Hct">
              Hematocrit (%):
            </label>
            <input
              type="number"
              name="Hct"
              value={testValues.Hct}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter Hematocrit"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="WBC">
              WBC (K/uL):
            </label>
            <input
              type="number"
              name="WBC"
              value={testValues.WBC}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter WBC"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="Platelets">
              Platelets (K/uL):
            </label>
            <input
              type="number"
              name="Platelets"
              value={testValues.Platelets}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter Platelets"
            />
          </div>
        </div>

        {/* Lipid Profile */}
        <h3 className="text-xl font-semibold text-white mb-4">Lipid Profile</h3>
        <div className="flex flex-wrap justify-between gap-4 mb-4">
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="Triglyceride">
              Triglyceride (mg/dL):
            </label>
            <input
              type="number"
              name="Triglyceride"
              value={testValues.Triglyceride}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter Triglyceride"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="Cholesterol">
              Total Cholesterol (mg/dL):
            </label>
            <input
              type="number"
              name="Cholesterol"
              value={testValues.Cholesterol}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter Total Cholesterol"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="LDL">
              LDL (mg/dL):
            </label>
            <input
              type="number"
              name="LDL"
              value={testValues.LDL}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter LDL"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="HDL">
              HDL (mg/dL):
            </label>
            <input
              type="number"
              name="HDL"
              value={testValues.HDL}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter HDL"
            />
          </div>
        </div>

        {/* Arterial Blood Gas (ABG) */}
        <h3 className="text-xl font-semibold text-white mb-4">Arterial Blood Gas (ABG)</h3>
        <div className="flex flex-wrap justify-between gap-4 mb-4">
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="pH">
              pH:
            </label>
            <input
              type="number"
              name="pH"
              value={testValues.pH}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter pH"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="HCO3">
              HCO3 (mEq/L):
            </label>
            <input
              type="number"
              name="HCO3"
              value={testValues.HCO3}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter HCO3"
            />
          </div>
        </div>

        {/* Trace Elements */}
        <h3 className="text-xl font-semibold text-white mb-4">Trace Elements</h3>
        <div className="flex flex-wrap justify-between gap-4 mb-4">
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="Zn">
              Zinc (mg/dL):
            </label>
            <input
              type="number"
              name="Zn"
              value={testValues.Zn}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter Zinc"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="Cu">
              Copper (mg/dL):
            </label>
            <input
              type="number"
              name="Cu"
              value={testValues.Cu}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter Copper"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="Cr">
              Chromium (mg/dL):
            </label>
            <input
              type="number"
              name="Cr"
              value={testValues.Cr}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter Chromium"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-lg text-white mb-1" htmlFor="Mg">
              Magnesium (mg/dL):
            </label>
            <input
              type="number"
              name="Mg"
              value={testValues.Mg}
              onChange={handleTestChange}
              required
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter Magnesium"
            />
          </div>
        </div>
        <div className="mt-8 text-white flex justify-between cursor-pointer">
          {/* Calculated Volumes Section */}
          <div className="w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-500 pb-2">Calculated Volumes (mL):</h2>
            <ul className="space-y-2">
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Sodium (Na): {volumes.Na.toFixed(2)} mL</li>
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Potassium (K): {volumes.K.toFixed(2)} mL</li>
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Chloride (Cl): {volumes.Cl.toFixed(2)} mL</li>
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Calcium (Ca): {volumes.Ca.toFixed(2)} mL</li>
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Magnesium (Mg): {volumes.Mg.toFixed(2)} mL</li>
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Phosphate (PO4): {volumes.PO4.toFixed(2)} mL</li>
            </ul>
            
            <h2 className="w-1/4 text-2xl font-bold mt-6 mb-4 border-b-2 border-blue-500 pb-2">Bicarbonates</h2>
            <ul className="space-y-2">
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Bicarbonate (HCO3): {volumes.HCO3.toFixed(2)} mL</li>
            </ul>
          </div>
{/* 
          <div className="flex flex-col space-y-6"> */}
             {/* Trace Elements Section */}
          {showTraceElements && (
            <div className="w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 border-b-2 border-green-500 pb-2">Trace Elements</h2>
              <ul className="space-y-2">
                <li className="hover:text-green-400 transition-colors text-lg font-semibold">Zinc: 5 mg</li>
                <li className="hover:text-green-400 transition-colors text-lg font-semibold">Copper: 1 mcg</li>
                <li className="hover:text-green-400 transition-colors text-lg font-semibold">Manganese (Mn): 0.5 mcg</li>
                <li className="hover:text-green-400 transition-colors text-lg font-semibold">Chromium: 10 mcg</li>
                <li className="hover:text-green-400 transition-colors text-lg font-semibold">Selenium: 60 mcg</li>
              </ul>
            </div>
          )}

          {/* Multivitamins Section */}
          {showMultivitamins && (
            <div className="w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-500 pb-2">Multivitamins</h2>
              <h3 className="text-xl font-semibold mb-2">Vitamins</h3>
              <ul className="space-y-2">
                <li className="hover:text-purple-400 transition-colors text-lg font-semibold">A: 4000 IU</li>
                <li className="hover:text-purple-400 transition-colors text-lg font-semibold">D3: 400 IU</li>
                <li className="hover:text-purple-400 transition-colors text-lg font-semibold">E: 10 IU</li>
                <li className="hover:text-purple-400 transition-colors text-lg font-semibold">K1: 80 mcg</li>
                <li className="hover:text-purple-400 transition-colors text-lg font-semibold">B1: 1.5 mg</li>
                <li className="hover:text-purple-400 transition-colors text-lg font-semibold">B2: 1.7 mg</li>
                <li className="hover:text-purple-400 transition-colors text-lg font-semibold">B6: 2 mg</li>
                <li className="hover:text-purple-400 transition-colors text-lg font-semibold">Folic Acid: 0.4 mcg</li>
                <li className="hover:text-purple-400 transition-colors text-lg font-semibold">Pantothenic Acid: 10 mg</li>
                <li className="hover:text-purple-400 transition-colors text-lg font-semibold">B12: 6 mcg</li>
                <li className="hover:text-purple-400 transition-colors text-lg font-semibold">Biotin: 300 mcg</li>
              </ul>
            </div>
          )}
        </div>
        {/* </div> */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg"
            onClick={handleSubmit}
          >
            Calculated Volume
          </button>
          <button
            onClick={() => setShowTraceElements(!showTraceElements)}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
           Trace Elements
          </button>
          <button
            onClick={() => setShowMultivitamins(!showMultivitamins)}
            className="bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Multivitamins
          </button>
        </div>
      </form>
    </div>
  );
};

export default CombinedForm;
