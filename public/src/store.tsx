import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlice from "./features/user/userSlice";
import quizStatsSlice from "./features/quizStats/quizStatsSlice";
import questionsSlice from "./features/quiz/questionsSlice";

export const store = configureStore({
    reducer: {
        user:userSlice,
        quizStats:quizStatsSlice,
        questions:questionsSlice
    },
});

export const reduxDispatch: () => typeof store.dispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;