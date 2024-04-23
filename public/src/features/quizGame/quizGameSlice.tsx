import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/helperFunctions";
import { QuestionSubmitInitialStateType } from "../../utils/helperFunctions";
import { QuestionType } from "../quizStats/quizStatsSlice";
import { toast } from "react-toastify";

type InitialQuizType = {
    isLoading: boolean,
    quizType: string,
    quizMode: boolean,
    quizDone: boolean,
    quizState: boolean
    activeQuestion: QuestionSubmitInitialStateType[],
    answeredQuestions: QuestionType[],
    activeCorrectAnswer: string,
    correctAnswers: number,
    maxQuestions: number,
    answersSubmitted: number,
    questionIsLoading: boolean,
}
const initialState: InitialQuizType = {
    isLoading: false,
    quizType: "History",
    quizMode: false,
    quizDone: false,
    quizState: false,
    activeQuestion: [],
    answeredQuestions: [],
    activeCorrectAnswer: "",
    correctAnswers: 0,
    maxQuestions: 10,
    answersSubmitted: 0,
    questionIsLoading: false,
};
const checkPermission = createAsyncThunk("quizGameSlice/quizPermission", async () => {
    try {
        const response = await customFetch.get('/quizStats/checkQuizPermission');
        return { data: response.data }
    } catch (error: any) {
        toast.error(error.response.data.msg)
        throw error;
    }
});
const getQuestion = createAsyncThunk(
    "quizGameSlice/quizQuestion",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as { quizGame: InitialQuizType };
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
            console.log('evaluation is being sent');
            const state = thunkAPI.getState() as { quizGame: InitialQuizType };
            const { answeredQuestions, correctAnswers, quizDone } = state.quizGame;
            const response = await customFetch.post(`/quizStats/evaluate`, { quizCorrectAnswers: correctAnswers, usedQuestions: answeredQuestions, quizDone });
            return { data: response.data }
        } catch (error: any) {
            toast.error(error.response.data.msg)
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
            if (answerIsTrue) {
                state.correctAnswers++;
            }
            state.answeredQuestions.push({ answerSubmitted, answerIsTrue, question });
        },
        skipQuestion: (state) => {
            state.answersSubmitted++;
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
        builder.addCase(sendEvaluatedStats.fulfilled, (_, action) => {
            console.log(action.payload);
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
    evaluateQuestion, skipQuestion
} = quizGameSlice.actions;
export { getQuestion, sendEvaluatedStats, checkPermission };
export default quizGameSlice.reducer;