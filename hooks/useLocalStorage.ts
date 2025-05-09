"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // custom hook to manage local storage, T is the type of the value stored in local storage.
  // key: the key to store the value in local storage
  // initialValue: the initial value to store in local storage
  // returns a tuple containing the stored value and a function to update it

  const [storedValue, setStoredValue] = useState<T>(initialValue); // <T> is generic type parameter, ensures that the stored value and setter function are of same type

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);

      // if item exists in local storage, initialize the stored value from local storage
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key]); // re-runs the effect when key changes

  // wrapped of setStoredValue that actually set the new value to localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value); // Save state
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value)); // Save to local storage
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
