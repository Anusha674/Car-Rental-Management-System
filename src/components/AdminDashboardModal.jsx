import React, { useState } from 'react';
import { X, ShieldCheck, Plus, Trash2, Edit3, Car, DollarSign, Users, CheckCircle, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';
import './AdminDashboardModal.css';

export default function AdminDashboardModal({
  cars,
  bookings,
  onClose,
  onAddCar,
  onToggleCarAvailability,
  onDeleteCar,
  onUpdateBookingStatus
}) {
  const [activeTab, setActiveTab] = useState('fleet'); // 'fleet' or 'bookings'
  const [showAddForm, setShowAddForm] = useState(false);

  // New Car Form State
  const [newCar, setNewCar] = useState({
    name: '',
    brand: '',
    category: 'Luxury',
    pricePerDay: 150,
    image: 'https://images.unsplash.com/photo-1541348263662-e082662d82da?auto=format&fit=crop&w=1000&q=80',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    location: 'Miami Airport',
    description: 'High performance luxury vehicle equipped with premium interior and advanced drive system.'
  });

  // Calculate Metrics
  const totalFleet = cars.length;
  const availableCars = cars.filter(c => c.available).length;
  const totalBookingsCount = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => b.status !== 'Cancelled' ? sum + b.totalCost : sum, 0);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCar.name || !newCar.brand) return;

    const carObj = {
      ...newCar,
      id: 'car-' + Date.now(),
      pricePerDay: Number(newCar.pricePerDay),
      seats: Number(newCar.seats),
      rating: 5.0,
      reviewsCount: 1,
      available: true,
      acceleration: '4.2s 0-60 mph',
      horsepower: '400 HP',
      features: ['Leather Seats', 'Bluetooth', 'Backup Camera', 'Navigation']
    };

    onAddCar(carObj);
    setShowAddForm(false);
    setNewCar({
      name: '',
      brand: '',
      category: 'Luxury',
      pricePerDay: 150,
      image: 'https://images.unsplash.com/photo-1541348263662-e082662d82da?auto=format&fit=crop&w=1000&q=80',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      seats: 5,
      location: 'Miami Airport',
      description: 'High performance luxury vehicle.'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Admin Management Console</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage fleet inventory, rental status, and customer reservations</p>
          </div>
        </div>

        {/* Dashboard Metrics Grid */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <span className="stat-card-title">Total Vehicles</span>
            <span className="stat-card-val">{totalFleet}</span>
          </div>
          <div className="admin-stat-card">
            <span className="stat-card-title">Available Fleet</span>
            <span className="stat-card-val" style={{ color: 'var(--success)' }}>{availableCars}</span>
          </div>
          <div className="admin-stat-card">
            <span className="stat-card-title">Total Bookings</span>
            <span className="stat-card-val">{totalBookingsCount}</span>
          </div>
          <div className="admin-stat-card">
            <span className="stat-card-title">Estimated Revenue</span>
            <span className="stat-card-val" style={{ color: '#10b981' }}>${totalRevenue}</span>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="admin-tabs-header">
          <button className={`admin-tab-btn ${activeTab === 'fleet' ? 'active' : ''}`} onClick={() => setActiveTab('fleet')}>
            Manage Fleet Vehicles ({cars.length})
          </button>
          <button className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            User Reservations ({bookings.length})
          </button>
        </div>

        {/* TAB 1: FLEET MANAGEMENT */}
        {activeTab === 'fleet' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontWeight: 700 }}>Fleet Directory</h4>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(!showAddForm)}>
                <Plus size={16} /> {showAddForm ? 'Cancel Form' : 'Add New Car'}
              </button>
            </div>

            {/* Add New Car Collapsible Form */}
            {showAddForm && (
              <form onSubmit={handleAddSubmit} style={{ background: 'var(--bg-glass)', border: '1px solid var(--primary)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>Add New Fleet Car</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Car Model Name *</label>
                    <input className="form-input" placeholder="e.g. Porsche 911 GT3" value={newCar.name} onChange={(e) => setNewCar({ ...newCar, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Brand *</label>
                    <input className="form-input" placeholder="e.g. Porsche" value={newCar.brand} onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={newCar.category} onChange={(e) => setNewCar({ ...newCar, category: e.target.value })}>
                      <option value="Luxury">Luxury</option>
                      <option value="SUV">SUV</option>
                      <option value="Sports">Sports</option>
                      <option value="Electric">Electric</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Economy">Economy</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Daily Price ($)</label>
                    <input type="number" className="form-input" value={newCar.pricePerDay} onChange={(e) => setNewCar({ ...newCar, pricePerDay: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fuel Type</label>
                    <select className="form-select" value={newCar.fuelType} onChange={(e) => setNewCar({ ...newCar, fuelType: e.target.value })}>
                      <option value="Petrol">Petrol</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Diesel">Diesel</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input className="form-input" value={newCar.image} onChange={(e) => setNewCar({ ...newCar, image: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem' }}>
                  Save Car to Fleet
                </button>
              </form>
            )}

            {/* Fleet Table */}
            <div style={{ overflowX: 'auto', maxHeight: '50vh' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Category</th>
                    <th>Price/Day</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id}>
                      <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={car.image} alt={car.name} style={{ width: '50px', height: '35px', borderRadius: '6px', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontWeight: 700 }}>{car.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{car.brand}</div>
                        </div>
                      </td>
                      <td>{car.category}</td>
                      <td><strong>${car.pricePerDay}</strong></td>
                      <td>
                        <button
                          className={`badge ${car.available ? 'badge-available' : 'badge-rented'}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => onToggleCarAvailability(car.id)}
                          title="Click to toggle availability"
                        >
                          {car.available ? '● Available' : '● Reserved'}
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                          onClick={() => onDeleteCar(car.id)}
                          title="Delete car"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div style={{ overflowX: 'auto', maxHeight: '55vh' }}>
            {bookings.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No user reservations recorded yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Dates</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td><strong>{b.id}</strong></td>
                      <td>
                        <div>{b.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.customerEmail}</div>
                      </td>
                      <td>{b.carName}</td>
                      <td>{b.pickupDate} → {b.returnDate}</td>
                      <td><strong>${b.totalCost}</strong></td>
                      <td>
                        <select
                          className="form-select"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                          value={b.status}
                          onChange={(e) => onUpdateBookingStatus(b.id, e.target.value)}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
