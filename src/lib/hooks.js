import { useEffect, useRef, useState } from 'react';

// Adds `is-visible` to elements with `.reveal` inside the returned ref once they scroll into view.
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.matches('.reveal') ? [root] : [...root.querySelectorAll('.reveal')];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

// True once the referenced element has scrolled up past the top of the screen.
// Uses a scroll listener (not IntersectionObserver) so anchor jumps that skip over the element still count.
export function useScrolledPast() {
  const ref = useRef(null);
  const [past, setPast] = useState(false);
  useEffect(() => {
    const check = () => ref.current && setPast(ref.current.getBoundingClientRect().bottom < 0);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
  return [ref, past];
}

// Locks page scroll while a drawer or modal is open.
export function useLockScroll(locked) {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [locked]);
}
