export function debounce<T extends (...args: string[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export function debounceSearch<T extends (...args: string[]) => void>(
  searchFunction: T
): (...args: Parameters<T>) => void {
  return debounce(searchFunction, 300);
} 