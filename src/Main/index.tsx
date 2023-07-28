import { Button } from '../components/Button';
import editorSvg from '../assets/editor.svg';
import styles from './Main.module.css';

export function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Button imgSrc={editorSvg} text='Message template editor' width='300px' height='50px' onClick={() => {}} />
      </div>
    </div>
  );
}
