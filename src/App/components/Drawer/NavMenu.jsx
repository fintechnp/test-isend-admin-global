import React, { useState } from 'react';

const NavMenu = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="nav" style={styles.nav}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        style={styles.input}
      />
      <svg style={styles.svg}>
        <use
          xlinkHref="#menu"
          style={{
            ...styles.use,
            ...(checked
              ? styles.useChecked1
              : styles.useUnchecked1)
          }}
        />
        <use
          xlinkHref="#menu"
          style={{
            ...styles.use,
            ...(checked
              ? styles.useChecked2
              : styles.useUnchecked2)
          }}
        />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" style={styles.hiddenSvg}>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 56" id="menu">
          <path d="M48.33,45.6H18a14.17,14.17,0,0,1,0-28.34H78.86a17.37,17.37,0,0,1,0,34.74H42.33l-21-21.26L47.75,4" />
        </symbol>
      </svg>
    </div>
  );
};

const styles = {
  nav: {
    '--color': '#ffffff',
    background: 'none',
    width: '100px',
    height: '56px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    fill: 'none',
    stroke: 'var(--color)',
    strokeWidth: '7px',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    maxHeight: '30px',
  },
  use: {
    transition: 'stroke-dashoffset .12s linear .2s, stroke-dasharray .12s linear .2s, opacity 0s linear .2s',
  },
  useUnchecked1: {
    opacity: 1,
    strokeDashoffset: 221,
    strokeDasharray: '46 249',
  },
  useChecked1: {
    strokeDashoffset: 175,
    strokeDasharray: '0 295',
    opacity: 0,
    transition: 'stroke-dashoffset .07s linear .07s, stroke-dasharray .07s linear .07s, opacity 0s linear .14s',
  },
  useUnchecked2: {
    animation: 'stroke-animation-reverse 1.2s ease-out forwards',
  },
  useChecked2: {
    animation: 'stroke-animation 1.2s ease-out forwards',
  },
  input: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 2,
    cursor: 'pointer',
    opacity: 0,
  },
  hiddenSvg: {
    display: 'none',
  },
};

export default NavMenu;
