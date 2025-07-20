// Animation utilities and keyframe definitions
export const animations = {
    fadeInUp: {
      animation: 'fadeInUp 0.6s ease-out forwards',
    },
    slideInLeft: {
      animation: 'slideInLeft 0.5s ease-out forwards',
    },
    slideInRight: {
      animation: 'slideInRight 0.5s ease-out forwards',
    },
    scaleIn: {
      animation: 'scaleIn 0.4s ease-out forwards',
    },
    pulse: {
      animation: 'pulse 2s infinite',
    }
  };
  
  export const addAnimationStyles = () => {
    if (document.getElementById('idea-canvas-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'idea-canvas-animations';
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(30px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: 200px 0; }
      }
    `;
    document.head.appendChild(style);
  };