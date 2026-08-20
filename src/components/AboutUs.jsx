import React from 'react';
import { ShieldCheck, Award, Clock, HeartHandshake, Star } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" style={{ padding: '4rem 0', background: 'var(--bg-glass)' }}>
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-tag">About DriveX</div>
          <h2 className="section-title">Redefining Modern Mobility</h2>
          <p className="section-subtitle">
            Founded with a passion for automotive excellence, DriveX provides premier car rental services across major metropolitan hubs and airport hubs worldwide.
          </p>
        </div>

        {/* Feature Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <ShieldCheck size={36} color="var(--primary)" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>Fully Insured Fleet</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Comprehensive damage protection & zero worry policy</p>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <Award size={36} color="var(--primary)" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>Guaranteed Models</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>You drive the exact car model you selected</p>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <Clock size={36} color="var(--primary)" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>24/7 Concierge</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Instant assistance, airport drop-off, roadside help</p>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <HeartHandshake size={36} color="var(--primary)" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>No Hidden Fees</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Transparent pricing upfront with no surprise costs</p>
          </div>
        </div>

        {/* Customer Testimonials Grid */}
        <div style={{ textCenter: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 800, textAlign: 'center', marginBottom: '2rem' }}>
            What Our Renters Say
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.75rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', italic: 'true', marginBottom: '1.25rem' }}>
                "Renting the Porsche Taycan for my trip to Miami was seamless. The airport handoff took 2 minutes and the car was pristine!"
              </p>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>David Sterling</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Business Executive</div>
            </div>

            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.75rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', italic: 'true', marginBottom: '1.25rem' }}>
                "The G-Wagon made our weekend getaway unforgettable. Amazing customer service and completely transparent checkout process."
              </p>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Elena Rostova</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Travel Blogger</div>
            </div>

            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.75rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', italic: 'true', marginBottom: '1.25rem' }}>
                "Best car rental platform I've used. LocalStorage booking history allowed me to track my business invoice instantly."
              </p>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Marcus Chen</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Tech Founder</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
