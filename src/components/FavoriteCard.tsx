import React from 'react';
import { FavoritePackage } from '@/types';
import { Trash2, ExternalLink, Calendar, Heart } from 'lucide-react';

interface FavoriteCardProps {
  favorite: FavoritePackage;
  onRemove: (id: string) => void;
}

export const FavoriteCard: React.FC<FavoriteCardProps> = ({ favorite, onRemove }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Heart size={20} className="text-red-500 mr-2" fill="currentColor" />
            <h3 className="text-xl font-semibold text-gray-900">{favorite.name}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-2">{favorite.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>Added on {formatDate(favorite.addedAt)}</span>
            <span className="mx-2">•</span>
            <span>v{favorite.version}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <a
            href={favorite.npmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
            title="View on NPM"
          >
            <ExternalLink size={20} />
          </a>
          <button
            onClick={() => onRemove(favorite.id)}
            className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-colors"
            title="Remove from favorites"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-md p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Why I love this package:</h4>
        <p className="text-gray-700 text-sm leading-relaxed">{favorite.reason}</p>
      </div>
    </div>
  );
};
