import React, { useState } from 'react';

const Autocomplete = ({ suggestions, placeholder="Search ....", label="Feature",onSelect }) => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Handle the input change and filter suggestions based on user input
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    onSelect(inputValue)
    if (inputValue) {
      // Filter suggestions based on the query
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Handle clicking on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
    onSelect(suggestion)

  };

  return (
    <div className="relative w-full max-w-md flex flex-col items-start gap-3">
      {/* Input field */}
     
      <div>
        <p className='label-text font-bold'>{label}:  </p>
      </div>
      <div className='w-[22rem]'>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          placeholder={placeholder}
        />

        {/* Suggestions dropdown */}
        {filteredSuggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
     
    </div>
  );
};

export default Autocomplete;
