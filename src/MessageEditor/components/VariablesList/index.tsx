import styles from './VariablesList.module.css';

type Props = {
  variablesArr: string[],
};

export function VariablesList({ variablesArr }: Props) {
  const getFormattedVariable = (variable: string) => `{${variable}}`;

  const onVariableClick = (event: React.MouseEvent<HTMLDivElement>, variable: string) => {
    event.preventDefault(); // prevents loss of focus from textarea when button clicked

    const textarea = document.activeElement;
    if (textarea instanceof HTMLTextAreaElement) { // checking is current focused element is textarea
      const caretStartPos = textarea.selectionStart;
      const caretEndPos = textarea.selectionEnd;
      const textToAdd = getFormattedVariable(variable);

      textarea.value = textarea.value.substring(0, caretStartPos) + textToAdd + textarea.value.substring(caretEndPos);

      // Returns caret to initial position
      textarea.selectionStart = caretStartPos + textToAdd.length;
      textarea.selectionEnd = caretStartPos + textToAdd.length;

      // Corner case when first row of textarea almost filled and then variable added
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  return (
    <section className={styles.container}>
      {variablesArr.map((variable, i) => {
        if (variable) {
          return (
            <div key={i} className={styles.variable} onMouseDown={event => onVariableClick(event, variable)}>
              {getFormattedVariable(variable)}
            </div>
          );
        }
        return null;
      })}
    </section>
  );
}
