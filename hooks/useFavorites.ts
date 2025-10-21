
import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'trueLoveFavorites';

export const useFavorites = (): [number[], (id: number) => void, boolean] => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavoriteIds(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds(prevIds => {
      const newIds = prevIds.includes(id)
        ? prevIds.filter(favId => favId !== id)
        : [...prevIds, id];
      
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newIds));
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
      }
      return newIds;
    });
  }, []);

  return [favoriteIds, toggleFavorite, isLoaded];
};
