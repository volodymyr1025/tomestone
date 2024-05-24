import { useState } from "react";

function useLocalStorage<T>(key: string): [T | null, (value: T) => void, () => void] {
  const storedValue = localStorage.getItem(key);
  const [value, setValue] = useState<T | null>(storedValue ? JSON.parse(storedValue) : null);

  const setStoredValue = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  const removeStoredValue = () => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return [value, setStoredValue, removeStoredValue];
}

export default useLocalStorage;
