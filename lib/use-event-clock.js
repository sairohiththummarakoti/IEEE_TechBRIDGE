'use client';

import { useEffect, useState } from 'react';

// Preserve the exported HTML for hydration, then refresh on load, every
// minute, and when a background tab becomes visible again.
export function useEventClock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const refresh = () => setNow(new Date());
    refresh();
    const timer = setInterval(refresh, 60000);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);
  return now;
}
