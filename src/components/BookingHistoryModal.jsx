import React from 'react';
import { X, Calendar, MapPin, CheckCircle2, Clock, Trash2, Car, AlertTriangle } from 'lucide-react';

export default function BookingHistoryModal({ bookings, onClose, onCancelBooking }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
            <Calendar size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>My Rental Reservations</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>View and manage your active and past car bookings</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div style={{ padding: '3rem 1rem', textAlign: 'center', background: 'var(--bg-glass)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <Car size={40} color="var(--text-muted)" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>No Bookings Yet</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Explore our fleet and reserve your luxury car today!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '0.25rem' }}>
            {bookings.map((item) => (
              <div key={item.id} style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img src={item.carImage} alt={item.carName} style={{ width: '100px', height: '70px', borderRadius: '10px', objectFit: 'cover' }} />

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>Ref: {item.id}</span>
                    <span className={`badge ${item.status === 'Cancelled' ? 'badge-rented' : 'badge-available'}`}>
                      {item.status}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.2rem 0' }}>{item.carName}</h4>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                    <span>📅 {item.pickupDate} → {item.returnDate} ({item.rentalDays} days)</span>
                    <span>📍 {item.location}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>${item.totalCost}</span>
                  {item.status !== 'Cancelled' && (
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                      onClick={() => onCancelBooking(item.id)}
                    >
                      <Trash2 size={12} /> Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
