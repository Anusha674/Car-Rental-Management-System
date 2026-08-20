import React from 'react';
import { Star, Heart, Fuel, Gauge, Users, Zap, Shield, ChevronRight } from 'lucide-react';
import './CarCard.css';

export default function CarCard({
  car,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onBookCar
}) {
  const {
    id,
    name,
    brand,
    category,
    pricePerDay,
    image,
    fuelType,
    transmission,
    seats,
    rating,
    reviewsCount,
    available,
    acceleration
  } = car;

  return (
    <div className="glass-card car-card">
      {/* Thumbnail Container */}
      <div className="car-image-wrap">
        <img src={image} alt={name} className="car-image" loading="lazy" />
        <div className="car-image-overlay" />

        {/* Top Badges */}
        <div className="car-badges-top">
          <span className="badge badge-category">{category}</span>
          <span className={`badge ${available ? 'badge-available' : 'badge-rented'}`}>
            {available ? '● Available' : '● Reserved'}
          </span>
        </div>

        {/* Favorite Heart Icon */}
        <button
          className={`wishlist-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(id)}
          title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={18} fill={isFavorite ? '#ffffff' : 'none'} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="car-card-body">
        <div className="car-title-wrap">
          <div>
            <span className="car-brand">{brand}</span>
            <h3 className="car-name">{name}</h3>
          </div>
          <div className="car-rating">
            <Star size={14} color="#f59e0b" fill="#f59e0b" />
            <span>{rating}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({reviewsCount})</span>
          </div>
        </div>

        {/* Car Specs Matrix */}
        <div className="car-specs-grid">
          <div className="spec-item" title="Powertrain Fuel">
            <Fuel size={14} color="#3b82f6" />
            <span>{fuelType}</span>
          </div>
          <div className="spec-item" title="Transmission">
            <Gauge size={14} color="#3b82f6" />
            <span>{transmission}</span>
          </div>
          <div className="spec-item" title="Seating Capacity">
            <Users size={14} color="#3b82f6" />
            <span>{seats} Seats</span>
          </div>
        </div>

        {/* Price Tag Row */}
        <div className="car-price-row">
          <div className="price-tag">
            <span className="price-amount">${pricePerDay}</span>
            <span className="price-unit">/ day</span>
          </div>
          {acceleration && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              ⚡ {acceleration}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="car-card-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onViewDetails(car)}
          >
            Details
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onBookCar(car)}
            disabled={!available}
          >
            {available ? 'Rent Now' : 'Reserved'}
          </button>
        </div>
      </div>
    </div>
  );
}
