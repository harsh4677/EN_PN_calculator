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

export default function LipidProfile() {
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
        </div>
    );
}
