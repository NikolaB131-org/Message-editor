import { BlockPart, BlockType } from '../../../hooks/useSectionsTree';
import { useContext, useRef, useEffect } from 'react';
import { SectionIdContext } from '../IfThenElseSection';
import { SectionsTreeContext } from '../..';
import { useTextareaAutoResize } from '../../../hooks/useTextareaAutoResize';
import styles from './Textarea.module.css';

type Props = {
  parentBlockPart: Exclude<BlockPart, BlockPart.Middle>;
  parentBlockType?: BlockType;
  className?: string;
  value?: string;
  placeholder?: string;
};

export function Textarea({
  parentBlockPart,
  parentBlockType,
  className = '',
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
      setText(textarea.value, parentBlockPart, parentBlockType, getCurrentSectionId());
    }
  };

  const onSelect = () => {
    setSelectedTextareaData({
      sectionId: getCurrentSectionId(),
      blockType: parentBlockType,
      textarea: ref.current ?? undefined,
    });
  };

  useEffect(() => {
    const textarea = ref.current;
    // Custom event listener for call onChange when adding variable (for updating actual tree)
    textarea?.addEventListener('addVariable', onChange);

    // On section delete, clears selectedTextareaData if selected textarea in section to be deleted
    return () => setSelectedTextareaData(prev => prev?.textarea === textarea ? undefined : prev);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <textarea
      ref={ref}
      className={`${styles.textarea} ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onSelect={onSelect}
    ></textarea>
  );
}
