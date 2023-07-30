import { useState } from 'react';
import { VariablesList } from './components/VariablesList';
import { Button } from '../components/Button';
import { Textarea } from '../components/Textarea';
import { Modal } from '../components/Modal';
import blockSchemeSvg from '../assets/block-scheme.svg';
import previewSvg from '../assets/preview.svg';
import checkMarkSvg from '../assets/check-mark.svg';
import crossSvg from '../assets/cross.svg';
import styles from './MessageEditor.module.css';

type Props = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
  arrVarNames: string[],
  template?: string,
  callbackSave: (template: string) => void,
};

export function MessageEditor({ setIsVisible, arrVarNames, template, callbackSave }: Props) {
  const [isMessagePreviewVisible, setIsMessagePreviewVisible] = useState(false);

  const onIfThenElseClick = () => {
    console.log('if then else');
  }

  return (
    <>
      <section className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.header_title}>Message Template Editor</h2>
          <div className={styles.header_content}>
            <div>
              <h3 className={styles.variables_title}>Variables</h3>
              <VariablesList variablesArr={arrVarNames} />
            </div>
            <Button imgSrc={blockSchemeSvg} text='IF | THEN | ELSE' onClick={() => onIfThenElseClick()} />
          </div>
        </header>
        <div className={styles.content}>
          <Textarea placeholder='placeholder...'/>
        </div>
        <footer className={styles.footer}>
          <Button imgSrc={previewSvg} text='Preview' onClick={() => setIsMessagePreviewVisible(true)} />
          <Button imgSrc={checkMarkSvg} text='Save' onClick={() => {}} />
          <Button imgSrc={crossSvg} text='Close' onClick={() => setIsVisible(false)} />
        </footer>
      </section>
      <Modal width='50vw' height='65vh' isVisible={isMessagePreviewVisible} setIsVisible={setIsMessagePreviewVisible} />
    </>
  );
}
