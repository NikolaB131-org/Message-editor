import { formatVariable } from '../../../utils/formatVariable';
import { Textarea } from '../Textarea';
import styles from './Variable.module.css';

type Props = {
  name: string;
  setVariable: (name: string, value: string) => void;
  value?: string;
};

export function Variable({ name, setVariable, value }: Props) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{formatVariable(name)}</p>
      <Textarea value={value} onChange={event => setVariable(name, event.target.value)} />
    </div>
  );
}
