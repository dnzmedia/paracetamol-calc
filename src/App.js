import React, { useState } from 'react';

// Main App component
const App = () => {
  // State variables for input fields and calculation result
  const [beratKg, setBeratKg] = useState('10'); // Berat (kg) - default to 10
  const [pekatPcm, setPekatPcm] = useState('250'); // PCM (mg) - default to 250, now linked to dropdown
  const [dosMl, setDosMl] = useState(''); // Dos (ml) - result

  /**
   * Handles the calculation of the paracetamol dosage.
   * This function is triggered when the "Kira" (Calculate) button is clicked.
   */
  const calculateDosage = () => {
    // Parse input values as floating point numbers
    const beratKgFloat = parseFloat(beratKg);
    const pekatPcmInt = parseInt(pekatPcm); // Now from the dropdown, so it will always be '120' or '250'

    // Basic validation to ensure inputs are valid numbers
    // pekatPcmInt will always be valid due to dropdown, but checking beratKgFloat is still good.
    if (isNaN(beratKgFloat) || pekatPcmInt === 0) { // Removed isNaN(pekatPcmInt) as it's controlled
      setDosMl('Sila masukkan nombor berat yang sah'); // Display error message
      return;
    }

    // Calculation logic based on the original JavaScript code:
    // 1. Calculate dosage in mg based on weight (15mg/kg is a common pediatric dose for paracetamol)
    const beratMg = beratKgFloat * 15;
    // 2. Calculate the volume in 'units' (e.g., if 250mg/5ml, this is total mg / mg per unit)
    const totalMgPerUnit = (beratMg / pekatPcmInt);
    // 3. Convert 'units' to ml (assuming 5ml per unit as per the original code's formula totalmg*5)
    const totalMl = (totalMgPerUnit * 5);

    // Update the result state, formatted to one decimal place
    setDosMl(totalMl.toFixed(1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-3xl font-extrabold mb-6 text-indigo-800">
          Kalkulator Dos Paracetamol
        </h1>

        {/* Input field for Berat (kg) */}
        <div className="mb-4">
          <label htmlFor="berat" className="block text-gray-700 text-lg font-medium mb-2">
            Berat (kg)
          </label>
          <input
            type="number" // Use type="number" for better mobile keyboard and validation
            id="berat"
            name="berat"
            value={beratKg}
            onChange={(e) => setBeratKg(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            placeholder="Masukkan berat dalam kg"
            inputMode="numeric" // Hint for mobile keyboards
          />
        </div>

        {/* Dropdown for Pekatan PCM (mg/5ml) */}
        <div className="mb-6">
          <label htmlFor="pcm" className="block text-gray-700 text-lg font-medium mb-2">
            Pilih Pekatan PCM (mg/5ml)
          </label>
          <select
            id="pcm"
            name="pcm"
            value={pekatPcm}
            onChange={(e) => setPekatPcm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 bg-white appearance-none pr-8" // appearance-none to remove default arrow
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="120">120 mg/5ml</option>
            <option value="250">250 mg/5ml</option>
          </select>
        </div>

        {/* Calculate button */}
        <button
          onClick={calculateDosage}
          className="w-full bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Kira Dos
        </button>

        {/* Result display */}
        <div className="mt-8">
          <h2 className="text-2xl font-extrabold text-indigo-800 mb-3">
            Dos yang Disyorkan (ml)
          </h2>
          <input
            type="text"
            id="answer"
            name="answer"
            value={dosMl}
            readOnly // Make the input read-only as it's a display field
            className="w-full p-4 border-2 border-indigo-500 bg-indigo-50 text-indigo-900 font-extrabold text-3xl rounded-lg text-center select-all focus:outline-none"
            placeholder="0.0"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
