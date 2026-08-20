import React from 'react';
import CarCard from './CarCard';
import { Car, Frown } from 'lucide-react';

export default function CarGrid({
  cars,
  favorites,
  onToggleFavorite,
  onViewDetails,
  onBookCar,
  onResetFilters
}) {
  if (cars.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <Frown size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Matching Cars Found</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          We couldn't find any vehicles matching your current search or filter criteria.
        </p>
        <button className="btn btn-primary" onClick={onResetFilters}>
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="car-grid-container">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isFavorite={favorites.includes(car.id)}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
          onBookCar={onBookCar}
        />
      ))}
    </div>
  );
}
