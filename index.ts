import { MMKVLoader } from "react-native-mmkv-storage";

const storage = new MMKVLoader().withEncryption().initialize();

export const saveToStorage = <T extends JSONSafe>(key: string, value: T) => {
    try {
        storage.setString(key, JSON.stringify(value));
    } catch {}
};

export const getFromStorage = <T extends JSONSafe>(key: string): T | null => {
    let stored: string | null | undefined;

    try {
        stored = storage.getString(key);
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
        return storage.removeItem(key);
    } catch {
        return false;
    }
};

export const clearStorage = () => {
    try {
        storage.clearStore();
    } catch {}
};
