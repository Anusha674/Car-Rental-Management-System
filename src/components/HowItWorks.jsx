import React from 'react';
import { Search, CalendarCheck, Key } from 'lucide-react';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-tag">Seamless 3-Step Journey</div>
          <h2 className="section-title">How DriveX Rental Works</h2>
          <p className="section-subtitle">
            Booking your dream car takes less than 2 minutes with our digital reservation platform.
          </p>
        </div>

        <div className="steps-grid">
          {/* Step 1 */}
          <div className="step-card">
            <span className="step-number-tag">01</span>
            <div className="step-icon-badge">
              <Search size={28} />
            </div>
            <h3 className="step-title">1. Choose Your Fleet Vehicle</h3>
            <p className="step-desc">
              Browse our curated collection of luxury sedans, electric supercars, and premium SUVs. Filter by price, fuel type, or seats.
            </p>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <span className="step-number-tag">02</span>
            <div className="step-icon-badge">
              <CalendarCheck size={28} />
            </div>
            <h3 className="step-title">2. Select Rental Dates</h3>
            <p className="step-desc">
              Pick your pickup & return dates. Add custom extras like full coverage insurance or GPS. Get instant transparent pricing.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <span className="step-number-tag">03</span>
            <div className="step-icon-badge">
              <Key size={28} />
            </div>
            <h3 className="step-title">3. Pick Up & Drive Away</h3>
            <p className="step-desc">
              Receive instant digital voucher confirmation. Pick up your disinfected vehicle at your requested airport or city lounge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
