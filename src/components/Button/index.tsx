import styles from './Button.module.css';

type Props = {
  className?: string,
  imgSrc?: string,
  text: string,
  onClick: () => void,
};

export function Button({ className, imgSrc, text, onClick }: Props) {
  return (
    <button className={`${styles.container} ${className}`} onClick={onClick}>
      <img className={styles.img} src={imgSrc} alt="" />
      <span className={styles.text}>{text}</span>
    </button>
  );
}
