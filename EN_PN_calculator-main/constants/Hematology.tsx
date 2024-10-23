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

export default function Hematology() {
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
        </div>
    );
}
