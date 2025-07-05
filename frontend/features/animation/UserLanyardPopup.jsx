import React from 'react';
import Lanyard from './Lanyard';

const lanyardPopupStyles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none', // allow clicks to pass through except for the lanyard
    zIndex: 1000,
  },
  lanyard: {
    position: 'absolute',
    // You may want to dynamically set these values based on the avatar's position
    top: '70px', // adjust to match header avatar vertical position
    right: '40px', // adjust to match header avatar horizontal position
    width: '340px',
    height: '340px',
    pointerEvents: 'auto',
    transition: 'transform 0.4s cubic-bezier(.4,2,.6,1)',
    transformOrigin: 'top right',
    // Optionally add a scale/translate animation here
  },
  closeBtn: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    background: 'rgba(30,41,59,0.7)',
    border: 'none',
    color: '#fff',
    fontSize: '1.5rem',
    cursor: 'pointer',
    zIndex: 2,
    borderRadius: '50%',
    width: '2.2rem',
    height: '2.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'auto',
  },
};

export default function UserLanyardPopup({ open, onClose, user = { name: 'John Doe', status: 'Online' } }) {
  if (!open) return null;
  return (
    <div style={lanyardPopupStyles.container}>
      <div style={lanyardPopupStyles.lanyard}>
        <button style={lanyardPopupStyles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} user={user} />
      </div>
    </div>
  );
}
