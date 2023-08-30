import React, { useState, useEffect } from 'react';
import styles from './mylanking.module.scss';

const Floating = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  useEffect(() => {
    const floatingInterval = setInterval(() => {
      const newPositionX = getRandomValue(0, screenWidth);
      const newPositionY = getRandomValue(0, screenHeight);
      setPositionX(newPositionX);
      setPositionY(newPositionY);
    }, 1000);

    return () => {
      clearInterval(floatingInterval);
    };
  }, [screenWidth, screenHeight]);

  return (
    <button
      className={styles.floatingComponent}
      style={{ left: `${positionX}px`, top: `${positionY}px` }}
    ></button>
  );
};

function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

export default Floating;
