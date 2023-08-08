import { useSectionsTree, Template, BlockType, BlockPart } from '../hooks/useSectionsTree';
import { createContext, useState } from 'react';
import { VariablesList } from './components/VariablesList';
import { Button } from '../components/Button';
import { Textarea } from '../components/Textarea';
import { IfThenElseSection } from './components/IfThenElseSection';
import { Modal } from '../components/Modal';
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
  sectionId?: number;
  blockType?: BlockType;
  textarea?: HTMLTextAreaElement;
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
    setRootSection,        // used in VariablesList
    sectionsTree,          // used in IfThenElseSection
    getSerializedTemplate, // used here
    setText,               // used in SectionsTreeContext
    addSection,            // used here
    deleteSection          // used in SectionsTreeContext
  } = useSectionsTree(template);

  const onIfThenElseClick = () => {
    addSection({
      sectionId: selectedTextareaData?.sectionId,
      blockType: selectedTextareaData?.blockType,
      textarea: selectedTextareaData?.textarea,
    });
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.header_title}>Message Template Editor</h2>
          <div className={styles.header_content}>
            <section>
              <h3 className={styles.variables_title}>Variables</h3>
              <VariablesList
                variablesArr={arrVarNames}
                setRootSection={setRootSection}
                selectedTextarea={selectedTextareaData?.textarea}
              />
            </section>
            <Button text='IF | THEN | ELSE' imgSrc={blockSchemeSvg} onMouseDown={onIfThenElseClick} />
          </div>
        </header>
        <div className={styles.content}>
          <SectionsTreeContext.Provider value={{ setSelectedTextareaData, setText, deleteSection }}>
            <Textarea
              parentBlockPart={BlockPart.First}
              className={styles.content_textarea_margin_bottom}
              value={rootSection[BlockPart.First]}
            />
            {sectionsTree && (
              <>
                <IfThenElseSection node={sectionsTree} />
                <Textarea
                  parentBlockPart={BlockPart.Last}
                  className={styles.content_textarea_margin_top}
                  value={rootSection[BlockPart.Last]}
                />
              </>
            )}
          </SectionsTreeContext.Provider>
        </div>
        <footer className={styles.footer}>
          <Button text='Preview' imgSrc={previewSvg} onClick={() => setIsPreviewVisible(true)} />
          <Button text='Save' imgSrc={checkMarkSvg} onClick={() => callbackSave(getSerializedTemplate())} />
          <Button text='Close' imgSrc={crossSvg} onClick={() => setIsVisible(false)} />
        </footer>
      </div>
      <Modal width='50vw' height='65vh' isVisible={isPreviewVisible} setIsVisible={setIsPreviewVisible} />
    </>
  );
}
