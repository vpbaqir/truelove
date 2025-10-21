import React, { useState, useMemo } from 'react';
import { Wali, Region, Century, Tariqa } from '../types';
import { SearchIcon, ChevronDownIcon, ChevronRightIcon } from './icons';

interface AwliyaListScreenProps {
  awliya: Wali[];
  onSelectWali: (id: number) => void;
  initialSearchQuery: string;
}

const FilterDropdown = ({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className={`appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-green-500 ${!value ? 'text-gray-500' : 'text-gray-900'}`}
    >
      <option value="">{label}</option>
      {options.map(option => <option key={option} value={option}>{option}</option>)}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <ChevronDownIcon className="w-4 h-4" />
    </div>
  </div>
);

const AwliyaListScreen: React.FC<AwliyaListScreenProps> = ({ awliya, onSelectWali, initialSearchQuery }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [regionFilter, setRegionFilter] = useState('');
  const [centuryFilter, setCenturyFilter] = useState('');
  const [tariqaFilter, setTariqaFilter] = useState('');

  const filteredAwliya = useMemo(() => {
    return awliya.filter(wali => {
      const matchesSearch = searchQuery.trim() === '' ||
        wali.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wali.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRegion = regionFilter === '' || wali.region === regionFilter;
      const matchesCentury = centuryFilter === '' || wali.century === centuryFilter;
      const matchesTariqa = tariqaFilter === '' || wali.tariqa === tariqaFilter;

      return matchesSearch && matchesRegion && matchesCentury && matchesTariqa;
    });
  }, [awliya, searchQuery, regionFilter, centuryFilter, tariqaFilter]);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Library of the Awliya</h1>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8 sticky top-4 z-10">
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or title..."
            className="w-full pl-5 pr-10 py-3 text-lg border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FilterDropdown label="Filter by Region" options={Object.values(Region)} value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} />
          <FilterDropdown label="Filter by Century" options={Object.values(Century)} value={centuryFilter} onChange={(e) => setCenturyFilter(e.target.value)} />
          <FilterDropdown label="Filter by Tariqa" options={Object.values(Tariqa)} value={tariqaFilter} onChange={(e) => setTariqaFilter(e.target.value)} />
        </div>
      </div>


      {/* Awliya List */}
      <div className="space-y-4">
        {filteredAwliya.length > 0 ? (
          filteredAwliya.map(wali => (
            <div
              key={wali.id}
              onClick={() => onSelectWali(wali.id)}
              className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between cursor-pointer group hover:border-green-500 border-l-4 border-transparent transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-900">{wali.name} <span className="text-lg font-light text-gray-500">{wali.honorifics}</span></h2>
                <p className="text-amber-700 text-md font-serif italic">{wali.title}</p>
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                    <span className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded-full">{wali.region}</span>
                    <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full">{wali.tariqa}</span>
                     <span className="bg-purple-100 text-purple-800 font-semibold px-3 py-1 rounded-full">{wali.century}</span>
                </div>
              </div>
               <div className="ml-4">
                 <ChevronRightIcon className="w-8 h-8 text-gray-300 group-hover:text-green-500 transition-colors" />
               </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-white rounded-xl shadow-md">
            <p className="text-gray-600 text-lg font-semibold">No Saints Found</p>
            <p className="text-gray-500 mt-1">Please try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AwliyaListScreen;