"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prevValue: T) => T)) => void] {
  // custom hook to manage local storage, T is the type of the value stored in local storage.
  // key: the key to store the value in local storage
  // initialValue: the initial value to store in local storage
  // returns a tuple containing the stored value and a function to update it

  // Initialize state with initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  // Update localStorage when storedValue changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
