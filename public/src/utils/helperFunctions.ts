import { MouseEvent,ChangeEvent } from "react"
import axios from "axios";

export type InitialStateType = {
    email: string,
    name: string,
    password: string,
}
export type ResetPasswordStateType = {
    password: string
}
export type ProfileFormType = {
    name: string,
    email: string
}
export type HandleChangeType = {
    target: {
        name: string;
        value: string;
        type:unknown
    };
}
export type UseStateType = InitialStateType | ResetPasswordStateType | ProfileFormType;

export const handleChange = <T extends UseStateType>(
    e: HandleChangeType,
    setValues: React.Dispatch<React.SetStateAction<T>>
) => {
    const { name, value, type } = e.target;
    const valueType = type === 'number' ? parseFloat(value) : value;
    setValues((prevValues: T) => ({
        ...prevValues,
        [name]: valueType,
    }));
};
// Handle Change Inputs

export type AuthStateType = {
    login:boolean,
    register:boolean,
    forgotPassword:boolean
}

export const setAuth = (e: MouseEvent<HTMLElement>, setAuthType: React.Dispatch<React.SetStateAction<AuthStateType>>) => {
    const authTypeTrigger = e.currentTarget.dataset.id;

    setAuthType((prevAuth: AuthStateType) => {
        const updatedAuthType: AuthStateType = Object.keys(prevAuth).reduce((acc, key) => {
            acc[key as keyof AuthStateType] = false;
            return acc;
        }, {} as AuthStateType);

        updatedAuthType[authTypeTrigger as keyof AuthStateType] = true;
        return updatedAuthType;
    });
};
// Change Auth Type
const productionURL:string = "http://localhost:5002/api/v1";

export const customFetch = axios.create({
    baseURL:productionURL
})
// 


// Question Add stuff
export type AnswerType = {
    option: string;
    isCorrect: boolean;
    _id?:string
};
export type QuestionSubmitInitialStateType = {
    question: string;
    questionType: string;
    answers: AnswerType[];
    _id?:string
};
export interface AddSelectionInter {
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => void;
    values: QuestionSubmitInitialStateType;
}
//

