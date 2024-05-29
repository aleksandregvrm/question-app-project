import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/helperFunctions";
import { InitialQuizGameType } from "../../types/quizGameTypes";
import { QuestionType } from "../../types/quizStatTypes";
import { toast } from "react-toastify";
import { addItemToLocalStorage,checkForItemInLocalStorage,removeItemFromLocalStorage,getItemFromLocalStorage, getObjectFromLocalStorage } from "../../utils/localStorage";

const initialState: InitialQuizGameType = {
    isLoading: false,
    quizType: getItemFromLocalStorage("category"),
    quizMode: false,
    quizDone: false,
    quizState: false,
    activeQuestion: [],
    answeredQuestions: getObjectFromLocalStorage("questionsUsed"),
    activeCorrectAnswer: "",
    correctAnswers: Number(getItemFromLocalStorage("correctAnswers")),
    maxQuestions: 10,
    answersSubmitted: Number(getItemFromLocalStorage("answersSubmitted")),
    questionIsLoading: false,
};
const checkPermission = createAsyncThunk("quizGameSlice/quizPermission", async () => {
    try {
        const response = await customFetch.get('/quizStats/checkQuizPermission');
        return { data: response.data }
    } catch (error: any) {
        throw error;
    }
});
const getQuestion = createAsyncThunk(
    "quizGameSlice/quizQuestion",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as { quizGame: InitialQuizGameType };
            const { quizType, quizMode } = state.quizGame;
            const response = await customFetch.get(`/questions?quizMode=${quizMode}&questionType=${quizType}`);
            return { data: response.data }
        } catch (error: any) {
            toast.error(error.response.data.msg)
            throw error;
        }
    }
);
const sendEvaluatedStats = createAsyncThunk(
    "quizGameSlice/evaluateQuizStats",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as { quizGame: InitialQuizGameType };
            const { answeredQuestions, correctAnswers, quizDone } = state.quizGame;
            const response = await customFetch.post(`/quizStats/evaluate`, { quizCorrectAnswers: correctAnswers, usedQuestions: answeredQuestions, quizDone });
            return { data: response.data }
        } catch (error: any) {
            throw error;
        }
    }
);
const quizGameSlice = createSlice({
    name: "quizStatsSlice",
    initialState,
    reducers: {
        evaluateQuestion: (state, action) => {
            const { answerSubmitted, answerIsTrue, question }: QuestionType = action.payload;
            state.answersSubmitted++;
            addItemToLocalStorage(state.answersSubmitted,"answersSubmitted");
            if (answerIsTrue) {
                state.correctAnswers++;
                addItemToLocalStorage(state.correctAnswers,"correctAnswers")
            };
            state.answeredQuestions.push({ answerSubmitted, answerIsTrue, question });
            addItemToLocalStorage(state.answeredQuestions,"questionsUsed");
        },
        saveCategory : (state,action) => {
            if(checkForItemInLocalStorage("category")){
                return
            }
            const categorySelected:string = action.payload;
            state.quizType = categorySelected;
            addItemToLocalStorage(categorySelected,"category");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getQuestion.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getQuestion.fulfilled, (state, action) => {
            if (state.answersSubmitted === 10) {
                state.isLoading = false;
                state.quizDone = true;
                addItemToLocalStorage(state.quizDone,"quizDoneStatus")
            } else {
                const { data: { questions } } = action?.payload;
                state.activeQuestion = questions;
                state.isLoading = false;
            }
        });
        builder.addCase(getQuestion.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(sendEvaluatedStats.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(sendEvaluatedStats.fulfilled, (state) => {
            if(state.quizDone){
                removeItemFromLocalStorage("answersSubmitted");
                removeItemFromLocalStorage("category");
                removeItemFromLocalStorage("correctAnswers");
                removeItemFromLocalStorage("questionsUsed");
                removeItemFromLocalStorage("quizDoneStatus");
                return {...initialState}
            }
        });
        builder.addCase(sendEvaluatedStats.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(checkPermission.fulfilled, (state) => {
            state.quizMode = true;
            state.quizState = true;
        })
    }
});
export const {
    evaluateQuestion,
    saveCategory
} = quizGameSlice.actions;
export { getQuestion, sendEvaluatedStats, checkPermission };
export default quizGameSlice.reducer;