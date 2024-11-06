export const saveToStorage = <T extends JSONSafe>(key: string, value: T) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
};

export const getFromStorage = <T extends JSONSafe>(key: string): T | null => {
    let stored: string | null | undefined;

    try {
        stored = window.localStorage.getItem(key);
    } catch {
        return null;
    }

    if (!stored) {
        return null;
    }

    try {
        return JSON.parse(stored) as T;
    } catch (err) {
        removeFromStorage(key);
        return null;
    }
};

export const getFromStorageOr = <T extends JSONSafe>(key: string, or: T): T => {
    const gotten = getFromStorage<T>(key);
    if (!gotten) {
        return or;
    }
    return gotten;
};

export const removeFromStorage = (key: string) => {
    try {
        return window.localStorage.removeItem(key);
    } catch {
        return false;
    }
};

export const clearStorage = () => {
    try {
        window.localStorage.clear();
    } catch {}
};
