import React, { useState } from 'react';
import { X, Calendar, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, User, Mail, Phone, FileText, MapPin, DollarSign } from 'lucide-react';
import { MOCK_LOCATIONS } from '../data/mockCars';
import './BookingModal.css';

export default function BookingModal({
  car,
  initialPickup,
  initialReturn,
  initialLocation,
  onClose,
  onConfirmBooking
}) {
  const [step, setStep] = useState(1);
  const [pickupDate, setPickupDate] = useState(initialPickup || new Date().toISOString().split('T')[0]);
  
  // Default return date is tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [returnDate, setReturnDate] = useState(initialReturn || tomorrow.toISOString().split('T')[0]);
  
  const [location, setLocation] = useState(initialLocation || MOCK_LOCATIONS[0]);

  // Add-ons state
  const [addons, setAddons] = useState({
    insurance: true, // $25/day
    gps: false,       // $10/day
    childSeat: false, // $15/day
    extraDriver: false // $20 flat
  });

  // Customer Contact Info
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [createdBooking, setCreatedBooking] = useState(null);

  if (!car) return null;

  // Calculate rental duration in days
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const diffTime = end.getTime() - start.getTime();
  const rentalDays = Math.max(1, Math.ceil(diffTime / (1000 * 3600 * 24)));

  // Calculate Prices
  const baseRentalCost = car.pricePerDay * rentalDays;
  const insuranceCost = addons.insurance ? 25 * rentalDays : 0;
  const gpsCost = addons.gps ? 10 * rentalDays : 0;
  const childSeatCost = addons.childSeat ? 15 * rentalDays : 0;
  const extraDriverCost = addons.extraDriver ? 20 : 0;
  
  const totalExtrasCost = insuranceCost + gpsCost + childSeatCost + extraDriverCost;
  const taxCost = Math.round((baseRentalCost + totalExtrasCost) * 0.10);
  const grandTotal = baseRentalCost + totalExtrasCost + taxCost;

  const toggleAddon = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email required';
    if (!formData.phone.trim() || formData.phone.length < 7) errs.phone = 'Valid phone number required';
    if (!formData.licenseNumber.trim()) errs.licenseNumber = 'Driver\'s License ID required';
    
    if (new Date(returnDate) <= new Date(pickupDate)) {
      errs.dates = 'Return date must be after pick-up date';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const bookingRef = 'DRV-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: bookingRef,
      carId: car.id,
      carName: car.name,
      carBrand: car.brand,
      carImage: car.image,
      pickupDate,
      returnDate,
      rentalDays,
      location,
      totalCost: grandTotal,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      licenseNumber: formData.licenseNumber,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setCreatedBooking(newBooking);
    onConfirmBooking(newBooking);
    setStep(3); // Move to success receipt
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content booking-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Stepper Progress Header */}
        <div className="booking-stepper">
          <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-num">{step > 1 ? <CheckCircle2 size={16} /> : '1'}</div>
            <span>Dates & Extras</span>
          </div>
          <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-num">{step > 2 ? <CheckCircle2 size={16} /> : '2'}</div>
            <span>Customer Info</span>
          </div>
          <div className={`step-item ${step === 3 ? 'active completed' : ''}`}>
            <div className="step-num">3</div>
            <span>Confirmation</span>
          </div>
        </div>

        {/* STEP 1: DATES & ADD-ONS */}
        {step === 1 && (
          <div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <img src={car.image} alt={car.name} style={{ width: '90px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>{car.brand}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{car.name}</h3>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>${car.pricePerDay} / day</span>
              </div>
            </div>

            {/* Date Selection Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Pick-up Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={pickupDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Return Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={returnDate}
                  min={pickupDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Pick-up Location</label>
              <select className="form-select" value={location} onChange={(e) => setLocation(e.target.value)}>
                {MOCK_LOCATIONS.map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Optional Add-ons */}
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem' }}>
              Select Optional Add-ons
            </h4>
            <div className="addons-grid">
              <div className={`addon-card ${addons.insurance ? 'selected' : ''}`} onClick={() => toggleAddon('insurance')}>
                <input type="checkbox" checked={addons.insurance} onChange={() => {}} className="addon-checkbox" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Full Coverage Insurance</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+$25 / day</div>
                </div>
              </div>

              <div className={`addon-card ${addons.gps ? 'selected' : ''}`} onClick={() => toggleAddon('gps')}>
                <input type="checkbox" checked={addons.gps} onChange={() => {}} className="addon-checkbox" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>GPS Satellite Navigation</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+$10 / day</div>
                </div>
              </div>

              <div className={`addon-card ${addons.childSeat ? 'selected' : ''}`} onClick={() => toggleAddon('childSeat')}>
                <input type="checkbox" checked={addons.childSeat} onChange={() => {}} className="addon-checkbox" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Child Safety Seat</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+$15 / day</div>
                </div>
              </div>

              <div className={`addon-card ${addons.extraDriver ? 'selected' : ''}`} onClick={() => toggleAddon('extraDriver')}>
                <input type="checkbox" checked={addons.extraDriver} onChange={() => {}} className="addon-checkbox" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Additional Driver</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+$20 flat fee</div>
                </div>
              </div>
            </div>

            {/* Price Breakdown Calculation */}
            <div className="price-summary-card">
              <div className="summary-row">
                <span>Rental Duration</span>
                <span>{rentalDays} {rentalDays === 1 ? 'day' : 'days'}</span>
              </div>
              <div className="summary-row">
                <span>Base Rate (${car.pricePerDay} × {rentalDays} days)</span>
                <span>${baseRentalCost}</span>
              </div>
              {totalExtrasCost > 0 && (
                <div className="summary-row">
                  <span>Selected Add-ons</span>
                  <span>+${totalExtrasCost}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Taxes & Service Fees (10%)</span>
                <span>+${taxCost}</span>
              </div>
              <div className="summary-row total">
                <span>Estimated Total</span>
                <span>${grandTotal}</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={() => setStep(2)}>
                Continue to Driver Details <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CUSTOMER CONTACT FORM */}
        {step === 2 && (
          <form onSubmit={handleSubmitBooking}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              Driver Contact Information
            </h3>

            {errors.dates && (
              <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertCircle size={16} /> {errors.dates}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Alexander Wright"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              {errors.fullName && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.fullName}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="alexander@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Driver's License / ID Number *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. DL-98472910"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              />
              {errors.licenseNumber && <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{errors.licenseNumber}</span>}
            </div>

            {/* Quick Final Recap Box */}
            <div style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px', margin: '1rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <span>Vehicle: {car.name} ({rentalDays} Days)</span>
                <span style={{ color: 'var(--primary)' }}>${grandTotal} Total</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Pick-up: {pickupDate} • Return: {returnDate}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                <CheckCircle2 size={18} /> Confirm & Reserve Vehicle
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: CONFIRMATION RECEIPT */}
        {step === 3 && createdBooking && (
          <div>
            <div className="receipt-box">
              <CheckCircle2 size={54} color="var(--success)" style={{ margin: '0 auto 0.75rem' }} />
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Booking Confirmed!
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Reservation Ref: <strong style={{ color: 'var(--primary)' }}>{createdBooking.id}</strong>
              </p>
            </div>

            <div className="price-summary-card">
              <h4 style={{ fontWeight: '700', marginBottom: '0.75rem' }}>Digital Invoice Details</h4>
              <div className="summary-row">
                <span>Vehicle Reserved</span>
                <strong style={{ color: 'var(--text-main)' }}>{createdBooking.carName}</strong>
              </div>
              <div className="summary-row">
                <span>Renter Name</span>
                <span>{createdBooking.customerName}</span>
              </div>
              <div className="summary-row">
                <span>Pick-up Location</span>
                <span>{createdBooking.location}</span>
              </div>
              <div className="summary-row">
                <span>Rental Dates</span>
                <span>{createdBooking.pickupDate} → {createdBooking.returnDate}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount Charged</span>
                <span>${createdBooking.totalCost}</span>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={onClose}>
                Done & Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
