import React from 'react';
import styles from './Button.module.css';

type Props = {
  children?: React.ReactNode;
  className?: string;
  text?: string;
  imgSrc?: string;
  onClick?: () => void;
  onMouseDown?: () => void;
};

export function Button({ children, className = '', text, imgSrc, onClick, onMouseDown }: Props) {
  const onMouseDownEvent = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();  // prevents loss of focus from textarea when button clicked
    if (onMouseDown) onMouseDown();
  };

  return (
    <button className={`${styles.container} ${className}`} onClick={onClick} onMouseDown={onMouseDownEvent}>
      {children ? children : (
        <>
          {imgSrc && <img className={styles.img} src={imgSrc} alt="" />}
          {text && <span className={styles.text}>{text}</span>}
        </>
      )}
    </button>
  );
}
