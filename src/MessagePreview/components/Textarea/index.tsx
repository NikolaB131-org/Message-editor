import { useRef } from 'react';
import { useTextareaAutoResize } from '../../../hooks/useTextareaAutoResize';
import styles from './Textarea.module.css';

type Props = {
  className?: string;
  readOnly?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function Textarea({ className = '', readOnly, value, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useTextareaAutoResize(ref, value);

  return (
    <textarea
      className={`${styles.textarea} ${className}`}
      ref={ref}
      readOnly={readOnly}
      value={value}
      onChange={onChange}
    ></textarea>
  );
}
