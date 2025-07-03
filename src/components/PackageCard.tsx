import React, { useState } from 'react';
import { NPMPackage } from '@/types';
import { Heart, ExternalLink, User, Calendar, Star } from 'lucide-react';

interface PackageCardProps {
  package: NPMPackage;
  onAddToFavorites: (pkg: NPMPackage, reason: string) => void;
  isFavorite: boolean;
  score?: number;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
  onAddToFavorites,
  isFavorite,
  score,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddToFavorites = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddToFavorites(pkg, reason.trim());
      setReason('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{pkg.description}</p>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              v{pkg.version}
            </span>
            <span className="flex items-center">
              <User size={14} className="mr-1" />
              {pkg.author?.name || pkg.publisher?.username || 'Unknown'}
            </span>
            <span>{formatDate(pkg.date)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {score && (
            <div className="flex items-center text-yellow-500">
              <Star size={16} className="mr-1" />
              <span className="text-sm font-medium">{Math.round(score * 100)}</span>
            </div>
          )}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            disabled={isFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite
                ? 'bg-red-100 text-red-600 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600'
            }`}
            title={isFavorite ? 'Already in favorites' : 'Add to favorites'}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <a
            href={pkg.links.npm}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
            title="View on NPM"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      {pkg.keywords && pkg.keywords.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {pkg.keywords.slice(0, 5).map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {keyword}
              </span>
            ))}
            {pkg.keywords.length > 5 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{pkg.keywords.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {showAddForm && !isFavorite && (
        <form onSubmit={handleAddToFavorites} className="mt-4 pt-4 border-t border-gray-200">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
            Why is this your favorite? *
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Tell us why you love this package..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            rows={3}
            required
          />
          <div className="flex justify-end space-x-2 mt-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !reason.trim()}
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding...' : 'Add to Favorites'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
