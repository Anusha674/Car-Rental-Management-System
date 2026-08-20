import React from 'react';
import { X, CheckCircle2, Star, Fuel, Gauge, Users, MapPin, Zap, Shield, Calendar } from 'lucide-react';
import './CarDetailsModal.css';

export default function CarDetailsModal({ car, onClose, onBookCar }) {
  if (!car) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content car-detail-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Hero Image */}
        <div className="car-detail-banner">
          <img src={car.image} alt={car.name} className="car-detail-img" />
        </div>

        {/* Title Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              {car.brand} • {car.category}
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{car.name}</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>${car.pricePerDay}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}> / day</span>
          </div>
        </div>

        {/* Location & Rating Bar */}
        <div style={{ display: 'flex', gap: '1.5rem', margin: '0.75rem 0 1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={16} color="var(--primary)" /> {car.location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Star size={16} color="#f59e0b" fill="#f59e0b" /> {car.rating} ({car.reviewsCount} reviews)
          </span>
        </div>

        {/* Description */}
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
          {car.description}
        </p>

        {/* Technical Specs Grid */}
        <div className="detail-specs-grid">
          <div className="detail-spec-card">
            <span className="detail-spec-label">Powertrain</span>
            <span className="detail-spec-val">{car.fuelType}</span>
          </div>
          <div className="detail-spec-card">
            <span className="detail-spec-label">Transmission</span>
            <span className="detail-spec-val">{car.transmission}</span>
          </div>
          <div className="detail-spec-card">
            <span className="detail-spec-label">Capacity</span>
            <span className="detail-spec-val">{car.seats} Adult Seats</span>
          </div>
          <div className="detail-spec-card">
            <span className="detail-spec-label">Acceleration</span>
            <span className="detail-spec-val">{car.acceleration || '0-60 mph 4.0s'}</span>
          </div>
          <div className="detail-spec-card">
            <span className="detail-spec-label">Horsepower</span>
            <span className="detail-spec-val">{car.horsepower || '450 HP'}</span>
          </div>
          <div className="detail-spec-card">
            <span className="detail-spec-label">Top Speed</span>
            <span className="detail-spec-val">{car.topSpeed || '155 mph'}</span>
          </div>
        </div>

        {/* Key Features List */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Premium Features Included</h4>
          <div className="features-list-grid">
            {car.features && car.features.map((feat, idx) => (
              <div key={idx} className="feature-pill">
                <CheckCircle2 size={16} color="var(--success)" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-primary"
            style={{ flex: 2 }}
            onClick={() => { onClose(); onBookCar(car); }}
            disabled={!car.available}
          >
            <Calendar size={18} />
            {car.available ? `Book This Car ($${car.pricePerDay}/day)` : 'Currently Reserved'}
          </button>
        </div>
      </div>
    </div>
  );
}
