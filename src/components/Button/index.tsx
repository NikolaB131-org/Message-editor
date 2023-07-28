import styles from './Button.module.css';

type Props = {
  imgSrc?: string,
  text: string,
  width: string,
  height: string,
  onClick: () => void,
};

export function Button({ imgSrc, text, width, height, onClick }: Props) {
  return (
    <button className={styles.container} style={{ width, height }} onClick={onClick}>
      <img className={styles.img} src={imgSrc} alt="" />
      <span className={styles.text}>{text}</span>
    </button>
  );
}
