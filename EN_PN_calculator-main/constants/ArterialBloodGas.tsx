import React, { useState } from 'react';

interface TestValues {
    pH: string;
    HCO3: string;
}

export default function ArterialBloodGas() {
    const [testValues, setTestValues] = useState<TestValues>({
        pH: '',
        HCO3: ''
    });

    const handleTestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTestValues(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            {/* Arterial Blood Gas (ABG) */}
            <h3 className="text-xl font-semibold text-white mb-4">Arterial Blood Gas (ABG)</h3>
            <div className="flex flex-wrap justify-between gap-4 mb-4">
                <div className="flex flex-col flex-grow">
                    <label className="text-lg text-white mb-1" htmlFor="pH">pH:</label>
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
                    <label className="text-lg text-white mb-1" htmlFor="HCO3">HCO3 (mEq/L):</label>
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
        </div>
    );
}
