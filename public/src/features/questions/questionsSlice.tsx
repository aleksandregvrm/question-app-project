import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/helperFunctions";
import { QuestionSubmitInitialStateType } from "../../utils/helperFunctions";
import { toast } from "react-toastify";
import { FilterStateType } from "../../utils/helperFunctions";

type InitialQuizType = {
    allQuestions:QuestionSubmitInitialStateType[],
    search:string,
    questionType:string,
    questionEditingId:string,
    isLoading:boolean,
}
const initialState: InitialQuizType = {
    allQuestions:[],
    search:"",
    questionType:"Math",
    questionEditingId:"",
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
const getAllQuestions = createAsyncThunk("questionsSlice/getAllQuestions",async(_,thunkAPI)=>{
    try {
        const state = thunkAPI.getState() as { questions: InitialQuizType };
        const {search,questionType} = state.questions;
        console.log(search,questionType);
        const response = await customFetch.get(`/questions?quizMode=false&questionType=${questionType}&search=${search}`);
        console.log(response);
        return {data: response.data}
    } catch (error: any) {
        
    }
})
const questionsSlice = createSlice({
    name: "quizStatsSlice",
    initialState,
    reducers: {
        changeFilters: (state, action: PayloadAction<FilterStateType>):void => {
          const {search,questionType} = action.payload;
          console.log(search,questionType);
          state.search = search;
          state.questionType = questionType;
        },
        setEditingId : (state, action:PayloadAction<string>):void=>{
           const id = action.payload
           state.questionEditingId = id;
        }
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
    changeFilters,
    setEditingId
} = questionsSlice.actions;
export { submitQuestion, getAllQuestions };
export default questionsSlice.reducer;