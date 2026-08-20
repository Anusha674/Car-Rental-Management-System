import React from 'react';
import { MapPin, Calendar as CalendarIcon, Car, Search, ShieldCheck } from 'lucide-react';
import { MOCK_LOCATIONS, CAR_CATEGORIES } from '../data/mockCars';
import './Hero.css';

export default function Hero({
  searchLocation,
  setSearchLocation,
  pickupDate,
  setPickupDate,
  returnDate,
  setReturnDate,
  selectedCategory,
  setSelectedCategory,
  onSearchClick
}) {
  return (
    <section className="hero-section">
      <div className="container hero-content">
        {/* Top Tagline Badge */}
        <div className="hero-badge">
          <ShieldCheck size={15} />
          <span>Verified & Insured Vehicle Fleet</span>
        </div>

        {/* Hero Title */}
        <h1 className="hero-title">
          Premium Car Rental <br />
          Made Simple & Transparent
        </h1>

        <p className="hero-subtitle">
          Select from executive sedans, high-performance SUVs, and electric vehicles. 
          Enjoy flexible daily rates, airport delivery, and instant booking.
        </p>

        {/* Quick Search Form Box */}
        <div className="quick-search-card">
          <form className="search-grid" onSubmit={(e) => { e.preventDefault(); onSearchClick(); }}>
            {/* Location Selector */}
            <div className="search-item">
              <label className="search-label">
                <MapPin size={14} color="var(--primary)" /> Pick-up Location
              </label>
              <select
                className="search-field"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              >
                <option value="">All Airport & City Hubs</option>
                {MOCK_LOCATIONS.map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Pick-up Date */}
            <div className="search-item">
              <label className="search-label">
                <CalendarIcon size={14} color="var(--primary)" /> Pick-up Date
              </label>
              <input
                type="date"
                className="search-field"
                value={pickupDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>

            {/* Return Date */}
            <div className="search-item">
              <label className="search-label">
                <CalendarIcon size={14} color="var(--primary)" /> Return Date
              </label>
              <input
                type="date"
                className="search-field"
                value={returnDate}
                min={pickupDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            {/* Car Category */}
            <div className="search-item">
              <label className="search-label">
                <Car size={14} color="var(--primary)" /> Vehicle Type
              </label>
              <select
                className="search-field"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CAR_CATEGORIES.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat} Vehicles</option>
                ))}
              </select>
            </div>

            {/* Search Submit Button */}
            <button type="submit" className="btn btn-primary search-btn">
              <Search size={16} /> Search Vehicles
            </button>
          </form>
        </div>

        {/* Hero Highlights */}
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Fleet Models</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">12,500+</span>
            <span className="stat-label">Satisfied Renters</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4.9/5</span>
            <span className="stat-label">User Rating</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Roadside Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
