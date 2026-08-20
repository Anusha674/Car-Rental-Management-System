import React, { useState } from 'react';
import { Car, Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import './Footer.css';

export default function Footer({ onShowToast }) {
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    onShowToast('Subscribed to DriveX fleet updates', 'success');
    setEmailInput('');
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div className="footer-brand">
              <Car size={24} color="var(--primary)" />
              <span>Drive<span className="brand-accent">X</span></span>
            </div>
            <p className="footer-desc">
              Professional car rental management system delivering instant reservations, transparent pricing, and 24/7 customer concierge.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <a href="#" className="nav-icon-btn" title="Instagram"><Instagram size={16} /></a>
              <a href="#" className="nav-icon-btn" title="Twitter"><Twitter size={16} /></a>
              <a href="#" className="nav-icon-btn" title="Facebook"><Facebook size={16} /></a>
              <a href="#" className="nav-icon-btn" title="LinkedIn"><Linkedin size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#fleet" className="footer-link">Vehicles Fleet</a></li>
              <li><a href="#how-it-works" className="footer-link">How It Works</a></li>
              <li><a href="#about" className="footer-link">About Us</a></li>
              <li><a href="#faq" className="footer-link">Support & FAQ</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="footer-title">Concierge</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Phone size={15} color="var(--primary)" /> +1 (800) 555-DRIVEX
              </li>
              <li style={{ display: 'flex', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Mail size={15} color="var(--primary)" /> concierge@drivex.com
              </li>
              <li style={{ display: 'flex', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <MapPin size={15} color="var(--primary)" /> Miami • LA • NYC
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="footer-title">Newsletter</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
              Subscribe for exclusive fleet arrivals and rate discounts.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.4rem' }}>
              <input
                type="email"
                className="form-input"
                placeholder="Enter email address..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary btn-sm" title="Subscribe">
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} DriveX IT Solutions. All rights reserved. (Task 1 Internship Project)</div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Insurance Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
