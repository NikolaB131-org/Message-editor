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
  placeholder?: string;
  value?: string;
};

export function Textarea({
  parentBlockPart,
  parentBlockType,
  className = '',
  placeholder = 'Some text',
  value,
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
    // Custom event listener for call onChange when adding variable
    ref.current?.addEventListener('addVariable', onChange);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <textarea
      className={`${styles.textarea} ${className}`}
      ref={ref}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onSelect={onSelect}
    ></textarea>
  );
}
