import React from 'react';

export default function MinimalFooter() {
  return (
    <footer
      style={{
        backgroundColor: '#111', // deep black for premium feel
        color: '#e5e5e5',        // soft white/grey text
        fontFamily: 'Poppins, sans-serif',
        padding: '3rem 1rem 1.5rem 1rem',
        textAlign: 'center',
      }}
    >
      {/* Brand */}
      <h5
        style={{
          fontWeight: 500,
          letterSpacing: '2px',
          marginBottom: '1rem',
          textTransform: 'uppercase',
        }}
      >
        SwiftCart
      </h5>

      {/* Tagline */}
      <p
        style={{
          maxWidth: '550px',
          margin: '0 auto',
          fontSize: '0.95rem',
          color: '#b5b5b5',
          lineHeight: 1.6,
        }}
      >
        Curated collections of tech, fashion, and lifestyle essentials —
        redefining the way you shop online.
      </p>

      {/* Divider */}
      <div
        style={{
          borderTop: '1px solid #333',
          marginTop: '2rem',
          paddingTop: '1rem',
          fontSize: '0.85rem',
          color: '#777',
        }}
      >
        © 2025 SwiftCart · All Rights Reserved
      </div>
    </footer>
  );
}
