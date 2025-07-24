export const setLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string): any => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export const removeLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
};

export const clearLocalStorage = (): void => {
    localStorage.clear();
};