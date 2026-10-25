'use client';

import { useEffect, useRef } from 'react';

/**
 * Two cheap bot filters shared by both forms; Code.gs silently drops any
 * submission that fails either.
 *
 *  - A honeypot input people never see or reach by keyboard. Bots that fill in
 *    every field fill this one too.
 *  - Time since the form appeared. A person needs more than a couple of
 *    seconds for these forms; a script posting instantly does not.
 *
 * Neither stops a bot written against this site specifically (both values are
 * client-supplied). See README.md, "Spam protection", for the next step.
 */
export function useSpamGuard() {
  const trapRef = useRef(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  return {
    trapRef,
    fields: () => ({
      hp_field: trapRef.current?.value ?? '',
      elapsedMs: Date.now() - startedAt.current,
    }),
    restart: () => {
      startedAt.current = Date.now();
    },
  };
}

export function Honeypot({ trapRef }) {
  return (
    <p className="hp" aria-hidden="true">
      <label>
        Leave this field empty
        <input ref={trapRef} name="hp_field" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </p>
  );
}
