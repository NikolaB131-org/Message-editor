import { useState } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { MessageEditor } from '../MessageEditor';
import { Template } from '../hooks/useSectionsTree';
import editorSvg from '../assets/editor.svg';
import styles from './Main.module.css';

export function Main() {
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  const editorArrVarNamesSaved = localStorage.getItem('arrVarNames');
  const editorTemplateSaved = localStorage.getItem('template');
  const editorArrVarNames: string[] = (
    editorArrVarNamesSaved ?
    JSON.parse(editorArrVarNamesSaved) :
    ['firstname', 'lastname', 'company', 'position']
  );
  const editorTemplate: Template | null = editorTemplateSaved ? JSON.parse(editorTemplateSaved) : null;

  const editorCallbackSave = async (template: string) => {
    localStorage.setItem('template', template);
    return true;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Button text='Message editor' imgSrc={editorSvg} onClick={() => setIsEditorVisible(true)} />
        </div>
      </div>
      <Modal width='80vw' height='90vh' isVisible={isEditorVisible} setIsVisible={setIsEditorVisible}>
        <MessageEditor
          setIsVisible={setIsEditorVisible}
          arrVarNames={editorArrVarNames}
          template={editorTemplate}
          callbackSave={editorCallbackSave}
        />
      </Modal>
    </>
  );
}
