export default function localStorageUtils<T>(
  key: string,
  defaultValue: T
): { initialLSvalue: T; setLSvalue: (x: T) => void } {
  const item = window.localStorage.getItem(key);
  const initialLSvalue = item ? JSON.parse(item) : defaultValue;

  const setLSvalue = (value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return { initialLSvalue, setLSvalue };
}
