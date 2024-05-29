import { LoginActionType } from "../features/user/userSlice";
import { QuestionType } from "../types/quizStatTypes";

export const checkForItemInLocalStorage = (item: string): boolean => {
    const result = localStorage.getItem(item);
    if (result) {
        return true
    }
    return false
}

export const addItemToLocalStorage = (item: string | number | boolean | LoginActionType | QuestionType[], storageName: string) => {
    localStorage.setItem(storageName, JSON.stringify(item));
};

export const removeItemFromLocalStorage = (item: string) => {
    return localStorage.removeItem(item);
};

export const getObjectFromLocalStorage = <T extends LoginActionType & QuestionType[]>(storageName:string) : T => { 
    const result = localStorage.getItem(storageName);
    const obj:T = result ? JSON.parse(result) : [];
    return obj;
}

export const getItemFromLocalStorage = <T extends string & boolean>(item:string): T => {
    const result = localStorage.getItem(item);
    let retrievedItem:T;
    retrievedItem = result ? JSON.parse(result) : '';
    if(retrievedItem === "true"){
      return JSON.parse(retrievedItem)
    }
    return retrievedItem;
}

