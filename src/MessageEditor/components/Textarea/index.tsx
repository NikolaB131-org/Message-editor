import { BlockType } from '../../../hooks/useSectionsTree';
import { useContext, useRef, useEffect } from 'react';
import { SectionIdContext } from '../IfThenElseSection';
import { SectionsTreeContext } from '../..';
import { useTextareaAutoResize } from '../../../hooks/useTextareaAutoResize';
import styles from './Textarea.module.css';

type Props = {
  parentPositionIndex: number;
  parentBlockType?: BlockType;
  value?: string;
  placeholder?: string;
};

export function Textarea({
  parentPositionIndex,
  parentBlockType,
  value,
  placeholder = 'Some text',
}: Props) {
  const { getCurrentSectionId } = useContext(SectionIdContext);
  const { setText, setSelectedTextareaData } = useContext(SectionsTreeContext);
  const ref = useRef<HTMLTextAreaElement>(null);

  useTextareaAutoResize(ref, value);

  const onChange = () => {
    const textarea = ref.current;
    if (textarea) {
      setText(textarea.value, parentPositionIndex, getCurrentSectionId(), parentBlockType);
    }
  };

  const onSelect = () => {
    if (ref.current) {
      setSelectedTextareaData({
        textarea: ref.current,
        parentPositionIndex,
        sectionId: getCurrentSectionId(),
        parentBlockType,
      });
    }
  };

  useEffect(() => {
    const textarea = ref.current;
    // On section delete, clears selectedTextareaData if selected textarea in section to be deleted
    return () => setSelectedTextareaData(prev => prev?.textarea === textarea ? undefined : prev);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <textarea
      ref={ref}
      className={styles.textarea}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onSelect={onSelect}
    ></textarea>
  );
}
