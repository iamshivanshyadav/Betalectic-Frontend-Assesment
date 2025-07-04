"use client";

import React, { useState } from "react";
import { FavoriteCard } from "@/components/FavoriteCard";
import { useFavorites } from "@/hooks/useFavorites";
import { ConfirmationModal } from "@/components/ConfirmationModal";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFavoriteId, setSelectedFavoriteId] = useState<string | null>(null);

  const handleRemoveClick = (id: string) => {
    setSelectedFavoriteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedFavoriteId) {
      removeFavorite(selectedFavoriteId);
    }
    setIsModalOpen(false);
    setSelectedFavoriteId(null);
  };

  const handleCancelRemove = () => {
    setIsModalOpen(false);
    setSelectedFavoriteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Favorite NPM Packages
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review and manage the NPM packages you&apos;ve marked as favorites
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No favorite packages added yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {favorites.map((favorite) => (
              <FavoriteCard
                key={favorite.id}
                favorite={favorite}
                onRemove={handleRemoveClick}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
        title="Remove Favorite"
        message="Are you sure you want to remove this package from your favorites?"
        confirmText="Remove"
        cancelText="Cancel"
        isDestructive
      />
    </div>
  );
}

