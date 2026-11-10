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

// 10-Minute Cart & Checkout Reservation Timer (persisted in sessionStorage)
export function useReservationTimer(defaultMinutes = 10) {
  const STORAGE_KEY = 'zvar_reservation_expires_at';

  const getInitialSeconds = () => {
    try {
      const stored = typeof window !== 'undefined' ? sessionStorage.getItem(STORAGE_KEY) : null;
      if (stored) {
        const remaining = Math.max(0, Math.floor((parseInt(stored, 10) - Date.now()) / 1000));
        if (remaining > 0) return remaining;
      }
      const expiresAt = Date.now() + defaultMinutes * 60 * 1000;
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEY, expiresAt.toString());
      }
      return defaultMinutes * 60;
    } catch {
      return defaultMinutes * 60;
    }
  };

  const [secondsLeft, setSecondsLeft] = useState(getInitialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const remaining = Math.max(0, Math.floor((parseInt(stored, 10) - Date.now()) / 1000));
          setSecondsLeft(remaining);
          if (remaining <= 0) {
            const nextExpires = Date.now() + defaultMinutes * 60 * 1000;
            sessionStorage.setItem(STORAGE_KEY, nextExpires.toString());
            setSecondsLeft(defaultMinutes * 60);
          }
        } else {
          const nextExpires = Date.now() + defaultMinutes * 60 * 1000;
          sessionStorage.setItem(STORAGE_KEY, nextExpires.toString());
          setSecondsLeft(defaultMinutes * 60);
        }
      } catch {
        setSecondsLeft((prev) => (prev > 1 ? prev - 1 : defaultMinutes * 60));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [defaultMinutes]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return { secondsLeft, formattedTime, mins, secs };
}
