import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./utils/api";

const SearchAndFilter = () => {
  const [userData, setUserData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedName(event.target.value);
  };

  
  const filteredData = selectedName
    ? userData.filter((elm) => elm.name === selectedName)
    : userData.filter((elm) =>
        elm.name.toLowerCase().includes(searchInput.toLowerCase())
      );

  return (
    <>
      <div className="flex items-center justify-center mt-5">
        {/* Search input */}
        <input
          type="text"
          className="flex h-10 w-1/3 mx-2 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search by name..."
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {/* Select dropdown */}
        <select
          className="flex h-10 w-1/3 mx-2 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          value={selectedName}
          onChange={handleSelectChange}
        >
          <option value="">Select a name...</option>
          {userData.map((elm) => (
            <option key={elm.id} value={elm.name}>
              {elm.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display filtered data */}
      <div className="flex flex-wrap gap-5 items-center justify-center h-screen p-5">
        {filteredData.map((elm) => (
          <div key={elm.id} className="relative h-[400px] w-[300px] rounded-md">
            <img
              src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
              alt="AirMax Pro"
              className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-left">
              <h1 className="text-lg font-semibold text-white">{elm.name}</h1>
              <p className="mt-2 text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, debitis?
              </p>
              <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                View Profile &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchAndFilter;
