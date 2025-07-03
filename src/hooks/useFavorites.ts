import { useState, useEffect } from 'react';
import { FavoritePackage } from '@/types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoritePackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem('npmFavorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const saveFavorites = (newFavorites: FavoritePackage[]) => {
    try {
      localStorage.setItem('npmFavorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addFavorite = (favorite: Omit<FavoritePackage, 'id' | 'addedAt'>) => {
    const newFavorite: FavoritePackage = {
      ...favorite,
      id: Date.now().toString(),
      addedAt: new Date().toISOString(),
    };
    
    const newFavorites = [...favorites, newFavorite];
    saveFavorites(newFavorites);
  };

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter(fav => fav.id !== id);
    saveFavorites(newFavorites);
  };

  const isFavorite = (packageName: string) => {
    return favorites.some(fav => fav.name === packageName);
  };

  const getFavoriteByName = (packageName: string) => {
    return favorites.find(fav => fav.name === packageName);
  };

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoriteByName,
  };
};
