import { useRef } from 'react';
import { useTextareaAutoResize } from '../../../hooks/useTextareaAutoResize';
import styles from './Textarea.module.css';

type Props = {
  className?: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function Textarea({ className = '', value, readOnly, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useTextareaAutoResize(ref, value);

  return (
    <textarea
      ref={ref}
      className={`${styles.textarea} ${className}`}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
    ></textarea>
  );
}
