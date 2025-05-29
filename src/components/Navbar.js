import React from 'react';

export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav style={styles.nav}>
      <button
        style={currentPage === 'home' ? styles.activeButton : styles.button}
        onClick={() => setCurrentPage('home')}
      >
        Home
      </button>
      <button
        style={currentPage === 'favorites' ? styles.activeButton : styles.button}
        onClick={() => setCurrentPage('favorites')}
      >
        Favorites
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  activeButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: 'white',
    border: '1px solid #333',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
