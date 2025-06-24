export const getItemFromStorage = (itemName: string) => {
  if (itemName === 'authToken') {
    console.warn('Auth tokens are now handled by HttpOnly cookies - use isAuthenticated() instead');
    return null;
  }
  
  const item = localStorage.getItem(itemName);
  if (item !== null) {
    try {
      return JSON.parse(item);
    } catch {
      return null;
    }
  }
  
  return null;
};

export const setItemInStorage = <T>(itemName: string, itemValue: T) => {
  if (itemName === 'authToken') {
    console.warn('Auth tokens are now handled by HttpOnly cookies');
    return;
  }
  
  localStorage.setItem(itemName, JSON.stringify(itemValue));
};

export const removeItemFromStorage = (itemName: string) => {
  if (itemName === 'authToken') {
    console.warn('Auth tokens are handled by HttpOnly cookies - they will expire automatically');
    return;
  }
  
  localStorage.removeItem(itemName);
};

export const setAuthTokenCookie = (token: string, expiresInHours: number = 2): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (expiresInHours * 60 * 60 * 1000));
  
  document.cookie = `authToken=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
};

export const removeAuthTokenCookie = (): void => {
  document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export const isAuthenticated = (): boolean => {
  return document.cookie.includes('authToken=');
};

export const getAuthTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'authToken') {
      return value;
    }
  }
  return null;
};
