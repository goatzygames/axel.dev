'use client';

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { unlockSetup, type SetupActionState } from "@/app/setup/actions";

const triggerCommand = "setup_real";
const initialState: SetupActionState = {};

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest("input, textarea, select, [contenteditable='true'], [contenteditable='']")
  );
}

export function SetupTerminal() {
  const router = useRouter();
  const [buffer, setBuffer] = useState("");
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(unlockSetup, initialState);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    router.push("/setup");
    router.refresh();
  }, [router, state.success]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (open || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (isEditableTarget(event.target) || event.key.length !== 1) {
        return;
      }

      const nextBuffer = `${buffer}${event.key}`.slice(-triggerCommand.length);
      setBuffer(nextBuffer);

      if (nextBuffer === triggerCommand) {
        setOpen(true);
        setBuffer("");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [buffer, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="terminal-overlay" role="dialog" aria-modal="true" aria-label="Setup terminal">
      <div className="terminal-window">
        <div className="terminal-bar">
          <span>local terminal</span>
          <button
            type="button"
            className="terminal-close"
            onClick={() => {
              setOpen(false);
              setBuffer("");
            }}
          >
            Close
          </button>
        </div>
        <div className="terminal-body">
          <p className="terminal-line">$ {triggerCommand}</p>
          <p className="terminal-line muted">command accepted</p>
          <form action={formAction} className="terminal-form">
            <label className="sr-only" htmlFor="setup-password">
              Password
            </label>
            <div className="terminal-input-row">
              <span>&gt;</span>
              <input
                id="setup-password"
                ref={inputRef}
                name="password"
                type="password"
                autoComplete="current-password"
                className="terminal-input"
                placeholder="Enter password"
              />
            </div>
            {state.error ? <p className="terminal-error">{state.error}</p> : null}
            <div className="inline-links" style={{ marginTop: "0.8rem" }}>
              <button type="submit" className="minimal-button" disabled={pending}>
                {pending ? "Checking..." : "Unlock"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
