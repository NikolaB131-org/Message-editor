import styles from './Button.module.css';

type Props = {
  imgSrc?: string,
  text: string,
  onClick: () => void,
};

export function Button({ imgSrc, text, onClick }: Props) {
  return (
    <button className={styles.container} onClick={onClick}>
      <img className={styles.img} src={imgSrc} alt="" />
      <span className={styles.text}>{text}</span>
    </button>
  );
}
