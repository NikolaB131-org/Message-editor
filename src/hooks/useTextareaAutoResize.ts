import { useEffect } from 'react';

export function useTextareaAutoResize(ref: React.RefObject<HTMLTextAreaElement>, value: any) {
  useEffect(() => {
    if (ref.current) {
      ref.current.style.overflow = 'hidden'; // hides scrollbar
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto resize when value changes
  useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      // requestAnimationFrame for prevent difference in height between scrollHeight and style.height with text gets bigger
      requestAnimationFrame(() => {
        // We need add borderWidth * 2 to properly calculate height
        const borderFullWidth = parseInt(getComputedStyle(textarea).borderWidth) * 2;
        textarea.style.height = '0';
        textarea.style.height = textarea.scrollHeight + borderFullWidth + 'px';
      });
    }
  }, [ref, value]);
}
