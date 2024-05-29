import { MouseEvent, ChangeEvent } from "react"
import { adminText, questionGuruText, userText } from "./otherStats";
import axios from "axios";
import adminIMG from "../assets/admin.png";
import userIMG from "../assets/user.png";
import questionGuruIMG from "../assets/guru.png";

// Input Textarea onChange
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
        type: unknown
    };
}
export type FilterStateType = {
    search: string,
    questionType: string,
}
export type UseStateType = InitialStateType | ResetPasswordStateType | ProfileFormType | FilterStateType | QuestionSubmitInitialStateType;

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
// Input Text area onChange End
// Handle Change Inputs

export type AuthStateType = {
    login: boolean,
    register: boolean,
    forgotPassword: boolean
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
// Handle Change Inputs End
// Change Auth Type
const productionURL: string = "http://localhost:5002/api/v1";

export const customFetch = axios.create({
    baseURL: productionURL
})
// Change Auth Type End

// Question Add stuff
export type AnswerType = {
    question?: string;
    option: string;
    isCorrect: boolean;
    _id?: string;
};
export type QuestionSubmitInitialStateType = {
    question?: string
    questionType?: string
    answers: AnswerType[]
    _id?: string
};
export interface AddSelectionInter {
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => void;
    values: QuestionSubmitInitialStateType;
}

export const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>, index: number, setValues: React.Dispatch<React.SetStateAction<QuestionSubmitInitialStateType>>): void => {
    const { value } = e.target;
    setValues(prevState => ({
        ...prevState,
        answers: prevState.answers.map((answer, i) => ({
            ...answer,
            option: i === index ? value : answer.option
        }))
    }));
};
// Question Add stuff End

// Additional functions regarding the Quiz stats...

export const evaluateLastQuizPoints = (num: number): string => {
    if (num === 0) {
        return 'TBD'
    }
    if (num <= 4) {
        return 'Horrible Performance'
    }
    if (num <= 6) {
        return 'Average Performance'
    }
    if (num <= 8) {
        return 'Great Performance'
    }
    if (num === 9) {
        return 'Almost Perfect'
    }
    return 'Superb Performance'
}

// Additional functions regarding the Quiz stats... end

// Quizing Eligibility check

export const eligibilityCheck = (role: string, quizDoneAmount: number): string => {
    if (role === 'admin') {
        return adminText
    }
    if (role === 'question-guru') {
        return questionGuruText
    }
    return userText(quizDoneAmount)
}

// Quizing Eligibility check End


// Formatting Date
export const formatDateToNumber = (dateString:Date):number => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference
}
export const formatDateDays = (dateString: Date): string => {
    const daysDifference = formatDateToNumber(dateString);
    if(daysDifference === 0){
        return "Today"
    }
    return `${daysDifference} days ago`;
}
// Formatting Date End

// Needed image generating
export const generateIMG = (role:string):string => {
  if(role === "admin"){
    return adminIMG
  }
  if(role === "question-guru"){
    return questionGuruIMG
  }
  return userIMG
}
// Needed image generating

// Quizer index calculator
export const calculateQuizerIndex = (userCreation:Date,averageQuizPoint:number,quizDoneAmount:number):number => {
  let quizerIndex:number = 0;
  if(quizDoneAmount >= 10){
      const userCreationIndex = 12.5 * (quizDoneAmount / formatDateToNumber(userCreation));
      console.log(userCreationIndex);
      const averageQuizPointIndex = averageQuizPoint * 5;
      quizerIndex = userCreationIndex + averageQuizPointIndex;
      return Math.ceil(quizerIndex);
  }
  return quizerIndex+2;
}
// Quizer index calculator End 
