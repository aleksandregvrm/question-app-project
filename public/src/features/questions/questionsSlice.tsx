import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/helperFunctions";
import { QuestionSubmitInitialStateType } from "../../utils/helperFunctions";
import { toast } from "react-toastify";
import { FilterStateType } from "../../utils/helperFunctions";

type InitialQuizType = {
    allQuestions: QuestionSubmitInitialStateType[],
    search: string,
    page: number,
    questionType: string,
    questionEditingId: string,
    isLoading: boolean,
}
const initialState: InitialQuizType = {
    allQuestions: [],
    search: "",
    page: 1,
    questionType: "Math",
    questionEditingId: "",
    isLoading: false
};
const changeQuestion = createAsyncThunk("questionsSlice/questionSubmit", async (questionEdited: QuestionSubmitInitialStateType, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as { questions: InitialQuizType };
        const { questionEditingId } = state.questions;
        const { question, answers } = questionEdited;
        const response = await customFetch.patch(`/questions/${questionEditingId}`, { fullQuestion: { question, answers } });
        thunkAPI.dispatch(getAllQuestions());
        toast.success(response.data.msg)
    } catch (error) {
        throw error;
    }
});
const submitQuestion = createAsyncThunk(
    "questionsSlice/questionSubmit",
    async ({ question, questionType, answers }: QuestionSubmitInitialStateType) => {
        try {
            const response = await customFetch.post(`/questions`, { question, questionType, answers });
            toast.success(response.data.msg)
        } catch (error: any) {
            toast.error(error.response.data.msg)
            throw error;
        }
    }
);
const getAllQuestions = createAsyncThunk("questionsSlice/getAllQuestions", async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as { questions: InitialQuizType };
        const { search, questionType, page } = state.questions;
        const response = await customFetch.get(`/questions?quizMode=false&questionType=${questionType}&search=${search}&page=${page}`);
        return { data: response.data }
    } catch (error: any) {

    }
})
const questionsSlice = createSlice({
    name: "quizStatsSlice",
    initialState,
    reducers: {
        changeFilters: (state, action: PayloadAction<FilterStateType>): void => {
            const { search, questionType } = action.payload;
            state.search = search;
            state.questionType = questionType;
        },
        setEditingId: (state, action: PayloadAction<string>): void => {
            const id = action.payload
            state.questionEditingId = id;
        },
        cancelEditing: (state): void => {
            state.questionEditingId = '';
        },
        nextPage: (state): void => {
            const lastPageCheck:boolean = state.
            allQuestions.length === 15;
            if(lastPageCheck){
                state.page = state.page + 1;
            }
        },
        prevPage: (state): void => {
            if(state.page > 1){
                state.page = state.page - 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllQuestions.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllQuestions.fulfilled, (state, action) => {
            state.isLoading = false;
            const { questions } = action?.payload?.data;
            state.allQuestions = questions;
        });
        builder.addCase(getAllQuestions.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(changeQuestion.rejected, (state) => {
            state.questionEditingId = '';
        });
        builder.addCase(changeQuestion.fulfilled, (state) => {
            state.questionEditingId = '';
        });
    }
});
export const {
    changeFilters,
    setEditingId,
    cancelEditing,
    nextPage,
    prevPage
} = questionsSlice.actions;
export { submitQuestion, getAllQuestions, changeQuestion };
export default questionsSlice.reducer;