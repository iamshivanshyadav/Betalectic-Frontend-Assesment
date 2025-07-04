'use client';

import React, { useState } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { searchNPMPackages } from '@/utils/api';
import { NPMPackage } from '@/types';
import { PackageCard } from '@/components/PackageCard';
import { useFavorites } from '@/hooks/useFavorites';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [packages, setPackages] = useState<NPMPackage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { addFavorite, isFavorite } = useFavorites();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (error) setError('');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

  
    if (searchTerm.trim().length < 2) {
      setError('Please enter at least 2 characters to search.');
      return;
    }

    setIsLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const response = await searchNPMPackages(searchTerm);
      setPackages(response.objects.map(obj => obj.package));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search packages. Please try again.';
      setError(errorMessage);
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToFavorites = (pkg: NPMPackage, reason: string) => {
    if (isFavorite(pkg.name)) {
      return;
    }

    addFavorite({
      name: pkg.name,
      description: pkg.description,
      reason,
      npmUrl: pkg.links.npm,
      version: pkg.version,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Favorite NPM Packages
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through millions of NPM packages and save your favorites with personal notes
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search NPM packages (e.g., react, lodash, express)..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !searchTerm.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Search'
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {hasSearched && !isLoading && packages.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No packages found for &quot;{searchTerm}&quot;</p>
            <p className="text-gray-400 mt-2">Try searching with different keywords</p>
          </div>
        )}

        {packages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Found {packages.length} packages
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.name}
                  package={pkg}
                  onAddToFavorites={handleAddToFavorites}
                  isFavorite={isFavorite(pkg.name)}
                />
              ))}
            </div>
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Start searching for NPM packages
            </h3>
            <p className="text-gray-500">
              Enter a package name or keyword to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
