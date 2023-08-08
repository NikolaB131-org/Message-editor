import { useEffect } from "react";

export function useTextareaAutoResize(textareaRef: React.RefObject<HTMLTextAreaElement>, value: any) {
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.overflow = 'hidden'; // hides scroll
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Auto resize when value changes
      textarea.style.height = '0';
      textarea.style.height = textarea.scrollHeight + 'px'
    }
  }, [textareaRef, value]);
}
