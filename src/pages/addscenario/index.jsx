import React, { useState } from "react";
import { Link, useParams,useLocation } from "react-router-dom";
const BASE_URL =
  process.env.BACKEND_URL || "https://0aba-86-98-70-229.ngrok-free.app";
function AddScenario() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [promptData, setPromptData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { state } = location;
  const tagData = state || '';
  console.log(state)
  const handleAdd = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  const handleCreateNew = () => {
    setItems([]);
    setNewItem("");
  };

  // Function to handle API call
  const fetchPromptData = async () => {
    if (!inputValue.trim()) {
      alert("Please enter a value.");
      return;
    }

    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${BASE_URL}/scenario/getScenarioSteps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputValue,projectId:'sample-cucumber-test' }),
      });

      if (response.ok) {
        const data = await response.json();
        setPromptData(data || []);
      } else {
        alert("Failed to fetch data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching prompt data:", error);
      alert("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
 
    <div className="p-6 bg-gray-100 min-h-screen">
          <Link to="/" className="btn btn-sm btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow">
        {/* Header */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="border rounded-md p-2 w-full mr-4"
            placeholder="FEA"
          />
        </div>

        {/* Tag Input */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={tagData}
            // onChange={(e) => setNewItem(e.target.value)}
            className="border rounded-md p-2 w-full mr-4"
            placeholder="tags"
          />
        </div>

        {/* Items Section */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left Box */}
          <div className="border rounded-md p-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="border-b py-2 text-gray-700"
              >
                {item}
              </div>
            ))}
            <button className="bg-blue-500 text-white px-4 py-2 mt-4 w-full rounded-md">
              Submit
            </button>
          </div>

          {/* Right Box */}
          <div className="mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a query"
            className="border rounded-md p-2 w-full"
          />
          <div className="overflow-x-auto">
          {promptData && promptData?.examples?.length > 0 &&
            <>
            {/* Scenario Name */}
            <div>Scenario Name: {promptData.name}</div>
        
            {/* Steps */}
            <div>Steps: {promptData.steps.join(', ')}</div>
        
            {/* Examples */}
            {promptData.examples.map((row, rowIndex) => (
              <div key={rowIndex}>
                {/* Example Row */}
                Example {rowIndex + 1}:
                {row.map((cell, cellIndex) => (
                  <span key={cellIndex}> {cell} </span>
                ))}
              </div>
            ))}
          </>
}
    </div>
            {/* Button */}
        <button
          onClick={fetchPromptData}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch Prompts"}
        </button>
        </div>

        </div>
      </div>
    </div>
  );
}

export default AddScenario;
