import { formatVariable } from '../../../utils/formatVariable';
import { Button } from '../../../components/Button';
import styles from './VariablesList.module.css';

type Props = {
  variablesArr: string[];
  addVariable: (variable: string) => void;
};

export function VariablesList({ variablesArr, addVariable }: Props) {
  return (
    <div className={styles.container}>
      {variablesArr.map((variable, i) => {
        if (variable) { // if variable is not empty string
          const formattedVariable = formatVariable(variable);
          return (
            <Button key={i} className={styles.variable} onMouseDown={() => addVariable(formattedVariable)}>
              {formattedVariable}
            </Button>
          );
        }
        return null;
      })}
    </div>
  );
}
