
import React from 'react';
import { Wali } from '../types';
import { HeartIcon } from './icons';

interface FavoritesScreenProps {
    favoriteAwliya: Wali[];
    onSelectWali: (id: number) => void;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ favoriteAwliya, onSelectWali }) => {
    return (
        <div className="p-4 md:p-6">
            <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">My Favorites</h1>
            
            {favoriteAwliya.length > 0 ? (
                <div className="space-y-4">
                    {favoriteAwliya.map(wali => (
                        <div
                            key={wali.id}
                            onClick={() => onSelectWali(wali.id)}
                            className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer hover:shadow-lg hover:border-green-500 border-l-4 border-transparent transition-all"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">{wali.name} <span className="text-sm font-normal text-gray-500">{wali.honorifics}</span></h2>
                                <p className="text-amber-600">{wali.title}</p>
                            </div>
                            <span className="text-gray-400">&rarr;</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                    <HeartIcon className="w-16 h-16 text-red-300 mx-auto" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-700">No Favorites Yet</h2>
                    <p className="mt-2 text-gray-500">You can add a Wali to your favorites from their profile page.</p>
                </div>
            )}
        </div>
    );
};

export default FavoritesScreen;
