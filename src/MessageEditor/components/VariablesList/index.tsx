import styles from './VariablesList.module.css';

type Props = {
  variablesArr: string[],
  onVariableClick: (variable: string) => void,
};

export function VariablesList({ variablesArr, onVariableClick }: Props) {
  return (
    <section className={styles.container}>
      {variablesArr.map((variable, i) => {
        if (variable) {
          return (
            <div key={i} className={styles.variable} onClick={() => onVariableClick(variable)}>
              {`{${variable}}`}
            </div>
          );
        }
        return null;
      })}
    </section>
  );
}
