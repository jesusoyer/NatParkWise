"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// List of states with their abbreviations
const states = [
  { name: "Alabama", code: "AL" },
  { name: "Alaska", code: "AK" },
  { name: "Arizona", code: "AZ" },
  { name: "Arkansas", code: "AR" },
  { name: "California", code: "CA" },
  { name: "Colorado", code: "CO" },
  { name: "Connecticut", code: "CT" },
  { name: "Delaware", code: "DE" },
  { name: "Florida", code: "FL" },
  { name: "Georgia", code: "GA" },
  { name: "Hawaii", code: "HI" },
  { name: "Idaho", code: "ID" },
  { name: "Illinois", code: "IL" },
  { name: "Indiana", code: "IN" },
  { name: "Iowa", code: "IA" },
  { name: "Kansas", code: "KS" },
  { name: "Kentucky", code: "KY" },
  { name: "Louisiana", code: "LA" },
  { name: "Maine", code: "ME" },
  { name: "Maryland", code: "MD" },
  { name: "Massachusetts", code: "MA" },
  { name: "Michigan", code: "MI" },
  { name: "Minnesota", code: "MN" },
  { name: "Mississippi", code: "MS" },
  { name: "Missouri", code: "MO" },
  { name: "Montana", code: "MT" },
  { name: "Nebraska", code: "NE" },
  { name: "Nevada", code: "NV" },
  { name: "New Hampshire", code: "NH" },
  { name: "New Jersey", code: "NJ" },
  { name: "New Mexico", code: "NM" },
  { name: "New York", code: "NY" },
  { name: "North Carolina", code: "NC" },
  { name: "North Dakota", code: "ND" },
  { name: "Ohio", code: "OH" },
  { name: "Oklahoma", code: "OK" },
  { name: "Oregon", code: "OR" },
  { name: "Pennsylvania", code: "PA" },
  { name: "Rhode Island", code: "RI" },
  { name: "South Carolina", code: "SC" },
  { name: "South Dakota", code: "SD" },
  { name: "Tennessee", code: "TN" },
  { name: "Texas", code: "TX" },
  { name: "Utah", code: "UT" },
  { name: "Vermont", code: "VT" },
  { name: "Virginia", code: "VA" },
  { name: "Washington", code: "WA" },
  { name: "West Virginia", code: "WV" },
  { name: "Wisconsin", code: "WI" },
  { name: "Wyoming", code: "WY" },
];

export default function Navbar() {
  const [selectedState, setSelectedState] = useState(""); // Track selected state
  const [selectedStateData, setSelectedStateData] = useState<any>(null); // To store selected state data
  const [stateLoading, setStateLoading] = useState<boolean>(false); // Loading state for individual state data

  // Function to fetch data for a selected state
  const fetchStateData = async (stateCode: string) => {
    setStateLoading(true); // Set loading state for individual state fetch
    try {
      const response = await fetch(`/api/state?state=${stateCode}`); // Fetch specific state data
      const data = await response.json();
      setSelectedStateData(data); // Store the selected state data
    } catch (error) {
      console.error("Error fetching data for state:", error);
    } finally {
      setStateLoading(false); // Set loading state to false once data is fetched
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Link to Home */}
        <Link href="/">
          <span className="text-xl font-bold">State Info App</span>
        </Link>

        {/* Dropdown to select a state */}
        <div className="relative">
          <select
            className="bg-white text-black px-4 py-2 rounded-md"
            value={selectedState}
            onChange={(e) => {
              const stateCode = e.target.value;
              setSelectedState(stateCode);
              fetchStateData(stateCode); // Fetch individual state data on selection
            }}
          >
            <option value="" disabled>
              Select a State
            </option>
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name} ({state.code})
              </option>
            ))}
          </select>
        </div>

        {/* Display the data for the selected state */}
        {stateLoading ? (
          <p>Loading data for selected state...</p>
        ) : (
          selectedStateData && (
            <div className="mt-4">
              <h3 className="text-lg font-bold">Data for {selectedState}</h3>
              {selectedStateData.parks.map((park: any) => (
                <div key={park.name} className="mb-4 border p-4 rounded-md">
                  {park.imageUrl && (
                    <img
                      src={park.imageUrl}
                      alt={park.name}
                      className="w-full h-auto rounded-md mb-4"
                    />
                  )}
                  <h4 className="text-xl font-bold">{park.name}</h4>
                  <p className="text-md font-medium">{park.description}</p>
                  <p className="text-sm text-gray-600">City: {park.city}</p>
                  <p className="text-sm text-gray-600">State: {park.state}</p>
                  <p className="text-sm text-gray-600">Address: {park.address}</p>
                  <a
                    href={park.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mt-2 inline-block"
                  >
                    Visit Website
                  </a>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </nav>
  );
}
