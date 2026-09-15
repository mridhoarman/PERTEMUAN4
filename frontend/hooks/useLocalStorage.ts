"use client";

import { useCallback, useSyncExternalStore } from "react";

type StorageListener = () => void;
const listeners = new Map<string, Set<StorageListener>>();

function subscribe(key: string, listener: StorageListener) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === key) listener();
  };
  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.get(key)?.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(key: string, fallback: string) {
  return window.localStorage.getItem(key) ?? fallback;
}

function getServerSnapshot(fallback: string) {
  return fallback;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const fallback = JSON.stringify(initialValue);
  const raw = useSyncExternalStore(
    (listener) => subscribe(key, listener),
    () => getSnapshot(key, fallback),
    () => getServerSnapshot(fallback),
  );

  const value = (() => {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return initialValue;
    }
  })();

  const setValue = useCallback(
    (nextValue: T | ((current: T) => T)) => {
      const current = (() => {
        try {
          return JSON.parse(window.localStorage.getItem(key) ?? fallback) as T;
        } catch {
          return initialValue;
        }
      })();
      const resolved = typeof nextValue === "function" ? (nextValue as (current: T) => T)(current) : nextValue;
      window.localStorage.setItem(key, JSON.stringify(resolved));
      listeners.get(key)?.forEach((listener) => listener());
    },
    [fallback, initialValue, key],
  );

  return [value, setValue] as const;
}
