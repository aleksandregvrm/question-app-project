import { LoginActionType } from "../features/user/userSlice";

export const checkForItemInLocalStorage = (item: string): boolean => {
    const result = localStorage.getItem(item);
    if (result) {
        return true
    }
    return false
}

export const addItemToLocalStorage = (item: string | LoginActionType, storageName: string) => {
    localStorage.setItem(storageName, JSON.stringify(item));
};

export const removeItemFromLocalStorage = (item: string) => {
    return localStorage.removeItem(item);
};

// User Specific
export const getUserFromLocalStorage = (): LoginActionType => {
    const result = localStorage.getItem("user");
    const user: LoginActionType = result ? JSON.parse(result) : '';
    return user;
};
// User Specific End

// Quiz Game Specific
export const getCategoryFromLocalStorage = (): string => {
    const result = localStorage.getItem("category");
    const retrievedItem: string = result ? JSON.parse(result) : '';
    return retrievedItem;
}
// Quiz Game Specific End


// USER RELATED
