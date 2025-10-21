import React, { useState } from 'react';
import { Wali } from '../types';
import { SearchIcon } from './icons';

// FIX: Add `featuredAwliya` to the component props to resolve type errors in App.tsx and the 'Cannot find name' error in this component.
interface HomeScreenProps {
  onSearch: (query: string) => void;
  onSelectWali: (id: number) => void;
  todaysRemembrance: Wali | null;
  isAnniversary: boolean;
  featuredAwliya: Wali[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSearch, onSelectWali, todaysRemembrance, isAnniversary, featuredAwliya }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="p-4 md:p-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-green-900">TRUE LOVE</h1>
        <p className="text-lg text-gray-600 mt-2">Stories of the Saints</p>
      </header>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a Wali by name or title..."
          className="w-full px-5 py-3 text-lg border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-green-700">
          <SearchIcon className="w-6 h-6" />
        </button>
      </form>

      {/* Today's Remembrance */}
      {todaysRemembrance && (
        <section className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto border-t-4 border-amber-500">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              {isAnniversary ? "Today's Remembrance (Urs)" : "Wali of the Day"}
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800">{todaysRemembrance.name} {todaysRemembrance.honorifics}</h3>
                <p className="text-sm text-gray-500 mb-3">{todaysRemembrance.title}</p>
                <blockquote className="border-l-4 border-green-200 pl-4 italic text-gray-600">
                "{todaysRemembrance.teachings[0]}"
                </blockquote>
                <button onClick={() => onSelectWali(todaysRemembrance.id)} className="mt-4 text-green-700 font-semibold hover:underline">
                Read more &rarr;
                </button>
            </div>
            </div>
        </section>
      )}

      {/* Featured Stories */}
      <section>
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">Featured Awliya</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAwliya.map((wali) => (
            <div key={wali.id} className="bg-white rounded-lg shadow-md p-5 text-center transition-transform hover:scale-105 cursor-pointer" onClick={() => onSelectWali(wali.id)}>
              <h3 className="text-lg font-bold text-gray-900">{wali.name}</h3>
              <p className="text-sm text-amber-600 mb-2">{wali.title}</p>
              <p className="text-sm text-gray-600 line-clamp-3">
                {wali.biography}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;