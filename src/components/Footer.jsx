import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '15px 20px',
        backgroundColor: '#282c34',
        color: '#fff',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      &copy; {new Date().getFullYear()} Course Platform. All rights reserved.
    </footer>
  );
}
