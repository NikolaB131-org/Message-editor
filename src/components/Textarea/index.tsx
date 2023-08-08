import { BlockPart, BlockType } from '../../hooks/useSectionsTree';
import { useContext, useRef, useEffect } from 'react';
import { SectionIdContext } from '../../MessageEditor/components/IfThenElseSection';
import { SectionsTreeContext } from '../../MessageEditor';
import styles from './Textarea.module.css';

type Props = {
  parentBlockPart: Exclude<BlockPart, BlockPart.Middle>;
  className?: string;
  value?: string;
  placeholder?: string;
  parentBlockType?: BlockType;
};

export function Textarea({
  parentBlockPart,
  className = '',
  value,
  placeholder = 'Some text',
  parentBlockType,
}: Props) {
  const { getCurrentSectionId } = useContext(SectionIdContext);
  const { setText, setSelectedTextareaData } = useContext(SectionsTreeContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onChange = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      setText(textarea.value, parentBlockPart, parentBlockType, getCurrentSectionId());
    }
  };

  const onSelect = () => {
    setSelectedTextareaData({
      sectionId: getCurrentSectionId(),
      blockType: parentBlockType,
      textarea: textareaRef.current ?? undefined,
    });
  };

  useEffect(() => {
    // Custom event listener for call onChange when adding variable
    textareaRef.current?.addEventListener('addVariable', onChange);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Auto resize when value changes
      textarea.style.height = '0';
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }, [value]);

  return (
    <textarea
      className={`${styles.textarea} ${className}`}
      ref={textareaRef}
      onChange={onChange}
      onSelect={onSelect}
      rows={1}
      value={value}
      placeholder={placeholder}
    ></textarea>
  );
}
