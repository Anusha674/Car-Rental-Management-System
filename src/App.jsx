import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import CarGrid from './components/CarGrid';
import CarDetailsModal from './components/CarDetailsModal';
import BookingModal from './components/BookingModal';
import BookingHistoryModal from './components/BookingHistoryModal';
import AdminDashboardModal from './components/AdminDashboardModal';
import AuthModal from './components/AuthModal';
import HowItWorks from './components/HowItWorks';
import AboutUs from './components/AboutUs';
import Toast from './components/Toast';
import Footer from './components/Footer';

import { INITIAL_CARS } from './data/mockCars';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem('drivex_theme') || 'dark');

  // Sync theme attribute with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('drivex_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Cars Fleet State
  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem('drivex_cars');
    return saved ? JSON.parse(saved) : INITIAL_CARS;
  });

  useEffect(() => {
    localStorage.setItem('drivex_cars', JSON.stringify(cars));
  }, [cars]);

  // User Bookings State
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('drivex_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('drivex_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Favorites State
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('drivex_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('drivex_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Auth User State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('drivex_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj);
    localStorage.setItem('drivex_user', JSON.stringify(userObj));
    showToast(`Welcome back, ${userObj.name}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('drivex_user');
    showToast('Signed out successfully', 'info');
  };

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchLocation, setSearchLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [maxPrice, setMaxPrice] = useState(500);
  const [fuelFilter, setFuelFilter] = useState('All');
  const [transmissionFilter, setTransmissionFilter] = useState('All');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Modals state
  const [selectedDetailCar, setSelectedDetailCar] = useState(null);
  const [bookingCar, setBookingCar] = useState(null);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Toggle Favorite Action
  const toggleFavorite = (carId) => {
    setFavorites(prev => {
      const exists = prev.includes(carId);
      const next = exists ? prev.filter(id => id !== carId) : [...prev, carId];
      showToast(exists ? 'Removed from favorites' : 'Added to favorites!', exists ? 'info' : 'success');
      return next;
    });
  };

  // Filtering Logic
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      // Category filter
      if (selectedCategory !== 'All' && car.category !== selectedCategory) return false;
      
      // Text search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(q);
        const matchesBrand = car.brand.toLowerCase().includes(q);
        const matchesLocation = car.location && car.location.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesLocation) return false;
      }

      // Location filter from Hero
      if (searchLocation && car.location && !car.location.includes(searchLocation)) {
        return false;
      }

      // Price Filter
      if (car.pricePerDay > maxPrice) return false;

      // Fuel Filter
      if (fuelFilter !== 'All' && car.fuelType !== fuelFilter) return false;

      // Transmission Filter
      if (transmissionFilter !== 'All' && car.transmission !== transmissionFilter) return false;

      // Available Only Filter
      if (availableOnly && !car.available) return false;

      // Show Only Favorites
      if (showOnlyFavorites && !favorites.includes(car.id)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [cars, selectedCategory, searchQuery, searchLocation, maxPrice, fuelFilter, transmissionFilter, availableOnly, showOnlyFavorites, favorites, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSearchLocation('');
    setPickupDate('');
    setReturnDate('');
    setMaxPrice(500);
    setFuelFilter('All');
    setTransmissionFilter('All');
    setAvailableOnly(false);
    setSortBy('featured');
    setShowOnlyFavorites(false);
  };

  // Admin Actions
  const handleAddCar = (newCarObj) => {
    setCars(prev => [newCarObj, ...prev]);
    showToast(`Added ${newCarObj.name} to fleet!`, 'success');
  };

  const handleToggleCarAvailability = (carId) => {
    setCars(prev => prev.map(c => c.id === carId ? { ...c, available: !c.available } : c));
    showToast('Car availability updated', 'info');
  };

  const handleDeleteCar = (carId) => {
    setCars(prev => prev.filter(c => c.id !== carId));
    showToast('Car removed from fleet', 'info');
  };

  const handleConfirmBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
    // Also mark car as reserved
    setCars(prev => prev.map(c => c.id === newBooking.carId ? { ...c, available: false } : c));
    showToast(`Booking ${newBooking.id} created successfully!`, 'success');
  };

  const handleCancelBooking = (bookingId) => {
    const target = bookings.find(b => b.id === bookingId);
    if (!target) return;

    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
    // Release car back to available
    setCars(prev => prev.map(c => c.id === target.carId ? { ...c, available: true } : c));
    showToast(`Booking ${bookingId} cancelled`, 'info');
  };

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    showToast(`Reservation status changed to ${newStatus}`, 'info');
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        favoritesCount={favorites.length}
        bookingsCount={bookings.length}
        onOpenBookings={() => setShowBookingsModal(true)}
        onOpenAdmin={() => setShowAdminModal(true)}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenFavorites={() => {
          setShowOnlyFavorites(!showOnlyFavorites);
          document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {/* Hero Section */}
        <Hero
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          pickupDate={pickupDate}
          setPickupDate={setPickupDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onSearchClick={() => {
            document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Car Fleet Listing & Filters Section */}
        <section id="fleet" className="filter-section">
          <div className="container">
            <div className="section-title-wrap">
              <div className="section-tag">
                {showOnlyFavorites ? 'Your Wishlist' : 'Curated Collection'}
              </div>
              <h2 className="section-title">
                {showOnlyFavorites ? 'Favorite Saved Vehicles' : 'Explore Premium Vehicles'}
              </h2>
              <p className="section-subtitle">
                Showing {filteredCars.length} luxury vehicles available for instant reservation
              </p>
            </div>

            {/* Interactive Filters Bar */}
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              fuelFilter={fuelFilter}
              setFuelFilter={setFuelFilter}
              transmissionFilter={transmissionFilter}
              setTransmissionFilter={setTransmissionFilter}
              availableOnly={availableOnly}
              setAvailableOnly={setAvailableOnly}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onResetFilters={resetFilters}
              totalResults={filteredCars.length}
            />

            {/* Fleet Cards Grid */}
            <CarGrid
              cars={filteredCars}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onViewDetails={(car) => setSelectedDetailCar(car)}
              onBookCar={(car) => setBookingCar(car)}
              onResetFilters={resetFilters}
            />
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* About Us & Testimonials Section */}
        <AboutUs />
      </main>

      {/* Footer */}
      <Footer onShowToast={showToast} />

      {/* Modals */}
      {selectedDetailCar && (
        <CarDetailsModal
          car={selectedDetailCar}
          onClose={() => setSelectedDetailCar(null)}
          onBookCar={(car) => setBookingCar(car)}
        />
      )}

      {bookingCar && (
        <BookingModal
          car={bookingCar}
          initialPickup={pickupDate}
          initialReturn={returnDate}
          initialLocation={searchLocation}
          onClose={() => setBookingCar(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {showBookingsModal && (
        <BookingHistoryModal
          bookings={bookings}
          onClose={() => setShowBookingsModal(false)}
          onCancelBooking={handleCancelBooking}
        />
      )}

      {showAdminModal && (
        <AdminDashboardModal
          cars={cars}
          bookings={bookings}
          onClose={() => setShowAdminModal(false)}
          onAddCar={handleAddCar}
          onToggleCarAvailability={handleToggleCarAvailability}
          onDeleteCar={handleDeleteCar}
          onUpdateBookingStatus={handleUpdateBookingStatus}
        />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Toast Popup Notification */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />
      )}
    </div>
  );
}
