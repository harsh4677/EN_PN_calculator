"use client";
import CalculatedButton from '@/components/CalculatedButton';
import AlbuminandTotalProtein from '@/constants/AlbuminAndTotalProtein';
import ArterialBloodGas from '@/constants/ArterialBloodGas';
import BloodGlucoseLevel from '@/constants/BloodGlucoseLevel';
import Hematology from '@/constants/Hematology';
import LipidProfile from '@/constants/LipidProfile';
import LiverFunctionTest from '@/constants/LiverFunctionTest';
import RenalFunction from '@/constants/RenalFunction ';
import TraceElements from '@/constants/TraceElements';
import {FormEvent, useState } from 'react';


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

  interface CalculatedButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick: (e: FormEvent<Element>) => void;
  }
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Electrolyte values submitted:', electrolytes);
    console.log('Medical test values submitted:', testValues);
    calculateVolumes();
    setSubmitted(true);

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
        <BloodGlucoseLevel/>

        {/* Liver Function Test (LFTs) */}
        <LiverFunctionTest/>


        {/* Renal Function */}
        <RenalFunction/>

        {/* Albumin and Total Protein */}
        <AlbuminandTotalProtein/>

        {/* Hematology */}
        <Hematology/>

        {/* Lipid Profile */}
        <LipidProfile/>

        {/* Arterial Blood Gas (ABG)*/}
        <ArterialBloodGas/>

        {/* Trace Elements */}
        <TraceElements/>


        <div className="mt-8 text-white flex justify-between cursor-pointer">
          {/* Calculated Volumes Section */}
          <div className="w-full text-center bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-500 pb-2">Electrolytes Volumes (mL):</h2>
            <ul className="space-y-2">
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Sodium (Na): {volumes.Na.toFixed(2)} mL</li>
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Potassium (K): {volumes.K.toFixed(2)} mL</li>
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Chloride (Cl): {volumes.Cl.toFixed(2)} mL</li>
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Calcium (Ca): {volumes.Ca.toFixed(2)} mL</li>
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Magnesium (Mg): {volumes.Mg.toFixed(2)} mL</li>
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Phosphate (PO4): {volumes.PO4.toFixed(2)} mL</li>
            </ul>
            <h2 className="w-full text-center text-2xl font-bold mt-6 mb-4 border-b-2 border-blue-500 pb-2">Bicarbonates</h2>
            <ul className="space-y-2">
              <li className="hover:text-blue-400 transition-colors text-lg font-semibold">Bicarbonate (HCO3): {volumes.HCO3.toFixed(2)} mL</li>
            </ul>
          </div>
        </div>

        {/* Button to Calculate Electrolyte Volumes */}
        <div>
          <button
            type="button"
            onClick={calculateVolumes}
            className="mt-8 w-full p-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg shadow-md"
          >
            Calculate Electrolyte Volumes
          </button>
          <div>
           <CalculatedButton/>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CombinedForm;

