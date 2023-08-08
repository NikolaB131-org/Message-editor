import { BlockPart, RootSection } from '../../../hooks/useSectionsTree';
import { Button } from '../../../components/Button';
import styles from './VariablesList.module.css';

type Props = {
  variablesArr: string[];
  setRootSection: React.Dispatch<React.SetStateAction<RootSection>>;
  selectedTextarea?: HTMLTextAreaElement;
};

export function VariablesList({ variablesArr, setRootSection, selectedTextarea }: Props) {
  const onVariableClick = (variable: string) => {
    if (selectedTextarea) {
      const selectionStartPos = selectedTextarea.selectionStart;
      const selectionEndPos = selectedTextarea.selectionEnd;

      // Adding variable between selection
      selectedTextarea.value = (
        selectedTextarea.value.substring(0, selectionStartPos) +
        variable +
        selectedTextarea.value.substring(selectionEndPos)
      );

      // Returns caret to initial position
      selectedTextarea.selectionStart = selectionStartPos + variable.length;
      selectedTextarea.selectionEnd = selectionStartPos + variable.length;

      // Dispatch custom event for triggering 'onChange' function of textarea
      selectedTextarea.dispatchEvent(new CustomEvent('addVariable'));
    } else { // if textarea has not been selected yet
      setRootSection(prev => ({ ...prev, [BlockPart.First]: (prev[BlockPart.First] ?? '') + variable }));
    }
  };

  return (
    <div className={styles.container}>
      {variablesArr.map((variable, i) => {
        if (variable) {
          const formattedVariable = `{${variable}}`;
          return (
            <Button key={i} className={styles.variable} onMouseDown={() => onVariableClick(formattedVariable)}>
              {formattedVariable}
            </Button>
          );
        }
        return null;
      })}
    </div>
  );
}
