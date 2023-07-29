import { useState } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { MessageEditor } from '../MessageEditor';
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
  const editorTemplate: string = editorTemplateSaved ? JSON.parse(editorTemplateSaved) : null;

  const editorCallbackSave = (template: string) => {
    localStorage.setItem('template', template);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Button imgSrc={editorSvg} text='Message editor' onClick={() => setIsEditorVisible(true)} />
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
