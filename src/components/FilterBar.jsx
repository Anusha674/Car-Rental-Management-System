import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, Zap, Shield, Flame, Car } from 'lucide-react';
import { CAR_CATEGORIES } from '../data/mockCars';
import './FilterBar.css';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  fuelFilter,
  setFuelFilter,
  transmissionFilter,
  setTransmissionFilter,
  availableOnly,
  setAvailableOnly,
  sortBy,
  setSortBy,
  onResetFilters,
  totalResults
}) {
  return (
    <div className="filter-wrapper">
      {/* Category Tabs Header */}
      <div className="category-tabs">
        {CAR_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'Electric' && <Zap size={14} />}
            {cat === 'Sports' && <Flame size={14} />}
            {cat === 'Luxury' && <Shield size={14} />}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Control Inputs Grid */}
      <div className="filter-controls-grid">
        {/* Search by Text */}
        <div className="filter-search-box">
          <label className="form-label">Search Vehicles</label>
          <div style={{ position: 'relative' }}>
            <Search size={18} className="filter-search-icon" />
            <input
              type="text"
              className="form-input filter-search-input"
              placeholder="Search by brand, model, features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Price Slider */}
        <div className="price-range-wrap">
          <div className="price-range-header">
            <span>Max Price / Day</span>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>${maxPrice}</span>
          </div>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            className="price-slider"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        {/* Fuel Type */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Fuel / Powertrain</label>
          <select
            className="form-select"
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
          >
            <option value="All">All Fuel Types</option>
            <option value="Electric">Electric</option>
            <option value="Petrol">Petrol</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Sort Fleet By</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured / Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Customer Rated</option>
          </select>
        </div>

        {/* Actions: Available Only Toggle & Clear */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <label className="toggle-switch-wrap">
            <input
              type="checkbox"
              className="toggle-checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
            />
            <span>Available Only</span>
          </label>

          <button
            className="btn btn-secondary btn-sm"
            onClick={onResetFilters}
            title="Reset Filters"
          >
            <RotateCcw size={14} /> Clear
          </button>
        </div>
      </div>
    </div>
  );
}
