import { useRef, useEffect } from "react";
import styles from './Textarea.module.css';

type Props = {
  placeholder?: string,
};

export function Textarea({ placeholder }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto resize for first render (if textarea has a value with text larger than 2 lines)
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }, []);

  const onInput = () => {
    // Auto resize
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '0';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  return (
    <textarea
      className={styles.textarea}
      ref={textareaRef}
      onInput={onInput}
      rows={1}
      placeholder={placeholder}
    ></textarea>
  );
}
