import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/helperFunctions";
import { QuestionSubmitInitialStateType } from "../../utils/helperFunctions";
import { toast } from "react-toastify";

type InitialQuizType = {
    allQuestions:QuestionSubmitInitialStateType[],
    isLoading:boolean
}
const initialState: InitialQuizType = {
    allQuestions:[],
    isLoading:false
};
const submitQuestion = createAsyncThunk(
    "questionsSlice/questionSubmit",
    async ({question,questionType,answers}:QuestionSubmitInitialStateType) => {
        try {
            const response = await customFetch.post(`/questions`,{question,questionType,answers});
            toast.success(response.data.msg)
        } catch (error: any) {
            toast.error(error.response.data.msg)
            throw error;
        }
    }
);
const getAllQuestions = createAsyncThunk("questionsSlice/getAllQuestions",async()=>{
    try {
        const response = await customFetch.get(`/questions?quizMode=false&questionType=History`);
        console.log(response.data);
        
        return {data: response.data}
    } catch (error: any) {
        
    }
})
const questionsSlice = createSlice({
    name: "quizStatsSlice",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getAllQuestions.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllQuestions.fulfilled, (state, action) => {
            state.isLoading = false;
            const {questions} = action?.payload?.data;
            state.allQuestions = questions;
        });
        builder.addCase(getAllQuestions.rejected, (state) => {
            state.isLoading = false;
        });
    }
});
export const {
    
} = questionsSlice.actions;
export { submitQuestion, getAllQuestions };
export default questionsSlice.reducer;