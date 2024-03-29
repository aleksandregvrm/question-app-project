import { LoginActionType } from "../features/user/userSlice";

export const addUserToLocalStorage = (user:LoginActionType) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
    return localStorage.removeItem("user");
};

export const getUserFromLocalStorage = ():LoginActionType => {
    const result = localStorage.getItem("user");
    const user:LoginActionType = result ? JSON.parse(result) : '';
    return user;
};