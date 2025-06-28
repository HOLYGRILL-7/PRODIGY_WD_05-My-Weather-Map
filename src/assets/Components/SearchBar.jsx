import React from 'react';

const SearchBar = (props) => {
  return (
    <div className='flex justify-center pt-10'>
      <div className="relative w-[60rem]">
        <input 
          type="text"
          placeholder='Which city...'
          className="w-full border-2 border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 rounded-full px-4 py-2 pr-24 text-gray-700 shadow-sm"
          value={props.city}
          onChange={(e) => props.setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') props.onSearch();
          }}
        />
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full shadow-md transition duration-200"
          onClick={props.onSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
