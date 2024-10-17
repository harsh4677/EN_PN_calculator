"use client";

import React, { useState } from 'react';

const StressANDTDEEpage: React.FC = () => {
  const [stressFactor, setStressFactor] = useState<string>('');
  const [customStressFactor, setCustomStressFactor] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>(''); // Track selected condition

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setStressFactor(selectedValue);
    setSelectedCondition(selectedValue);
    setCustomStressFactor(''); // Clear custom input when selecting from dropdown
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomStressFactor(e.target.value);
  };

  return (
    <div>
      <h1 className='text-white font-extrabold'>Stress and TDEE Calculator</h1>
      
      <div className="flex items-center gap-4 mb-4">
        <div>
          <label className='text-white font-bold' htmlFor='stressFactor'>
            Select Condition:
          </label>
          <select
            id='stressFactor'
            value={selectedCondition} // Keep the selected condition value
            onChange={handleChange}
            className='text-black p-2 rounded'
          >
            <option value='' disabled>
              -- Select a condition --
            </option>
            <option value='1.0'>Normal/No stress (1.0)</option>
            <option value='1.1 - 1.2'>Minor Surgery (1.1 - 1.2)</option>
            <option value='1.2 - 1.3'>Infection/Illness (1.2 - 1.3)</option>
            <option value='1.2 - 1.4'>Moderate Surgery (1.2 - 1.4)</option>
            <option value='1.3 - 1.4'>Trauma/Fractures (1.3 - 1.4)</option>
            <option value='1.3 - 1.5'>Major Surgery (1.3 - 1.5)</option>
            <option value='1.4 - 1.6'>Severe Infection (1.4 - 1.6)</option>
            <option value='1.4 - 1.8'>Head Injury (1.4 - 1.8)</option>
            <option value='1.5 - 1.8'>Burns (&lt;40% body surface area) (1.5 - 1.8)</option>
            <option value='1.8 - 2.0'>Severe Burns (&gt;40% body surface area) (1.8 - 2.0)</option>
            <option value='1.5 - 1.7'>Sepsis (1.5 - 1.7)</option>
            <option value='1.5 - 1.8'>Multiple Trauma (1.5 - 1.8)</option>
            <option value='1.2 - 1.5'>Cancer/Chronic Disease (1.2 - 1.5)</option>
          </select>
        </div>

        <div>
          <label className='text-white font-bold' htmlFor='customStressFactor'>
            Enter Custom Stress Factor:
          </label>
          <input
            type='text'
            id='customStressFactor'
            value={customStressFactor}
            onChange={handleCustomChange}
            className='text-black p-2 rounded w-32'
            placeholder="e.g. 1.2"
          />
        </div>
      </div>

      <div className='text-white font-semibold mt-4'>
        {customStressFactor ? (
          <p className="text-white font-extrabold">Custom Stress Factor: {customStressFactor}</p>
        ) : (
          stressFactor && <p>Selected Stress Factor: {stressFactor}</p>
        )}
      </div>
    </div>
  );
};

export default StressANDTDEEpage;
