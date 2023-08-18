import { useSectionsTree, Template, BlockType } from '../hooks/useSectionsTree';
import { isSectionNode } from '../utils/isSectionNode';
import { createContext, useState } from 'react';
import { VariablesList } from './components/VariablesList';
import { Button } from '../components/Button';
import { Textarea } from './components/Textarea';
import { IfThenElseSection } from './components/IfThenElseSection';
import { Modal } from '../components/Modal';
import { MessagePreview } from '../MessagePreview';
import blockSchemeSvg from '../assets/block-scheme.svg';
import previewSvg from '../assets/preview.svg';
import checkMarkSvg from '../assets/check-mark.svg';
import crossSvg from '../assets/cross.svg';
import styles from './MessageEditor.module.css';

type SectionsTreeContextType = {
  setSelectedTextareaData: React.Dispatch<React.SetStateAction<SelectedTextareaData | undefined>>;
  setText: ReturnType<typeof useSectionsTree>['setText'];
  deleteSection: ReturnType<typeof useSectionsTree>['deleteSection'];
};
const defaultContextState: SectionsTreeContextType = {
  setSelectedTextareaData: () => {}, // used in Textarea element
  setText: () => {},                 // used in Textarea element
  deleteSection: () => {},           // used in IfThenElseSection element
};
export const SectionsTreeContext = createContext<SectionsTreeContextType>(defaultContextState);

export type SelectedTextareaData = {
  textarea: HTMLTextAreaElement;
  parentPositionIndex: number;
  sectionId?: number;
  parentBlockType?: BlockType;
};

type Props = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  arrVarNames: string[];
  template: Template | null;
  callbackSave: (template: string) => Promise<boolean>;
};

export function MessageEditor({ setIsVisible, arrVarNames, template, callbackSave }: Props) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [selectedTextareaData, setSelectedTextareaData] = useState<SelectedTextareaData>();

  const {
    rootSection,           // used here
    getSerializedTemplate, // used here
    getTemplate,           // used here
    setText,               // used in SectionsTreeContext
    addVariable,           // used here
    addSection,            // used here
    deleteSection          // used in SectionsTreeContext
  } = useSectionsTree(template);

  const onAddVariableClick = (variable: string) => {
    addVariable(variable, selectedTextareaData);
  };

  const onIfThenElseClick = () => {
    if (selectedTextareaData) {
      addSection(selectedTextareaData);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.header_title}>Message Template Editor</h2>
          <div className={styles.header_content}>
            <section>
              <h3 className={styles.variables_title}>Variables</h3>
              <VariablesList variablesArr={arrVarNames} addVariable={onAddVariableClick} />
            </section>
            <Button text='IF | THEN | ELSE' imgSrc={blockSchemeSvg} onMouseDown={onIfThenElseClick} />
          </div>
        </header>

        <div className={styles.content_container}>
          <div className={styles.content}>
            <SectionsTreeContext.Provider value={{ setSelectedTextareaData, setText, deleteSection }}>
              {rootSection.map((part, i) => {
                if (isSectionNode(part)) {
                  return <IfThenElseSection key={i} node={part} />;
                } else {
                  return <Textarea key={i} parentPositionIndex={i} value={part} />;
                }
              })}
            </SectionsTreeContext.Provider>
          </div>
        </div>

        <footer className={styles.footer}>
          <Button text='Preview' imgSrc={previewSvg} onClick={() => setIsPreviewVisible(true)} />
          <Button text='Save' imgSrc={checkMarkSvg} onClick={() => callbackSave(getSerializedTemplate())} />
          <Button text='Close' imgSrc={crossSvg} onClick={() => setIsVisible(false)} />
        </footer>
      </div>

      <Modal width='40vw' height='70vh' isVisible={isPreviewVisible} setIsVisible={setIsPreviewVisible}>
        <MessagePreview arrVarNames={arrVarNames} template={getTemplate()} setIsVisible={setIsPreviewVisible} />
      </Modal>
    </>
  );
}
