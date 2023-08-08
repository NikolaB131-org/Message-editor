import styles from './Modal.module.css';

type Props = {
  width: string,
  height: string,
  isVisible: boolean,
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
  children?: React.ReactNode,
};

export function Modal({ width, height, isVisible, setIsVisible, children }: Props) {
  if (isVisible) {
    return (
      <div className={styles.container} onMouseDown={() => setIsVisible(false)}>
        <div className={styles.content} style={{ width, height }} onMouseDown={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }
  return null;
}
