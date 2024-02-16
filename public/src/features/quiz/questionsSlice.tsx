import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/helperFunctions";
import { QuestionSubmitInitialStateType } from "../../utils/helperFunctions";
import { toast } from "react-toastify";

type InitialQuizType = {
    allQuestions:QuestionSubmitInitialStateType[]
}
const initialState: InitialQuizType = {
    allQuestions:[],
};
const submitQuestion = createAsyncThunk(
    "questionsSlice/questionSubmit",
    async ({question,questionType,answers}:QuestionSubmitInitialStateType) => {
        try {
            const response = await customFetch.post(`/questions`,{question,questionType,answers});
            console.log(response);
            toast.success(response.data.msg)
        } catch (error: any) {
            toast.error(error.response.data.msg)
            throw error;
        }
    }
);
const questionsSlice = createSlice({
    name: "quizStatsSlice",
    initialState,
    reducers: {
        
    },
    extraReducers: () => {

    }
});
export const {
    
} = questionsSlice.actions;
export { submitQuestion };
export default questionsSlice.reducer;