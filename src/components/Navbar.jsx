import React, { useState } from 'react';
import { Car, Sun, Moon, Heart, Calendar, ShieldCheck, User, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar({
  theme,
  toggleTheme,
  favoritesCount,
  bookingsCount,
  onOpenBookings,
  onOpenAdmin,
  onOpenAuth,
  onOpenFavorites,
  currentUser,
  onLogout
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#" className="nav-brand">
          <div className="brand-icon-wrap">
            <Car size={22} />
          </div>
          <span>Drive<span className="brand-accent">X</span></span>
        </a>

        {/* Navigation Links */}
        <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <li><a href="#fleet" className="nav-link" onClick={() => setMobileOpen(false)}>Vehicles</a></li>
          <li><a href="#how-it-works" className="nav-link" onClick={() => setMobileOpen(false)}>How It Works</a></li>
          <li><a href="#about" className="nav-link" onClick={() => setMobileOpen(false)}>About Us</a></li>
          <li><a href="#faq" className="nav-link" onClick={() => setMobileOpen(false)}>Support</a></li>
        </ul>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Wishlist Button */}
          <button
            className="nav-icon-btn"
            title="Saved Favorites"
            onClick={onOpenFavorites}
          >
            <Heart size={18} />
            {favoritesCount > 0 && <span className="nav-badge">{favoritesCount}</span>}
          </button>

          {/* Bookings History Button */}
          <button
            className="nav-icon-btn"
            title="My Bookings"
            onClick={onOpenBookings}
          >
            <Calendar size={18} />
            {bookingsCount > 0 && <span className="nav-badge">{bookingsCount}</span>}
          </button>

          {/* Admin Dashboard */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenAdmin}
            title="Admin Management"
          >
            <ShieldCheck size={16} />
            <span className="hide-mobile">Admin</span>
          </button>

          {/* Auth Button */}
          {currentUser ? (
            <button className="btn btn-outline btn-sm" onClick={onLogout} title="Sign Out">
              <User size={15} />
              <span>{currentUser.name.split(' ')[0]} (Sign Out)</span>
            </button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={onOpenAuth}>
              <User size={15} />
              <span>Sign In</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            className="nav-icon-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} color="#94a3b8" /> : <Moon size={18} color="#0f172a" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="nav-icon-btn mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
