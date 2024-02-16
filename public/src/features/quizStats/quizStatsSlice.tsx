import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/helperFunctions";
type QuestionType = {
    question: string,
    answerSubmitted: string,
    answerIsTrue: boolean
}
type lastQuizResult = {
    lastQuizCorrectAnswers: number,
    lastQuizDoneDate: Date | null
    questionsUsed: QuestionType[]
}
export type LeaderboardType = {
    name:string,
    role:string,
    quizDoneAmount:number, 
    averageQuizValue:number, 
    place:number,
    id:string,
}
type InitialQuizStatsType = {
    quizDone: number,
    quizDoneAmount: number,
    totalQuizPoints: number,
    averageQuizValue: number,
    lastQuizResult: lastQuizResult,
    detailsOpen: boolean,
    isLoading:boolean,
    leaderboard:LeaderboardType[],
    leaderboardListPart:number,
    disableLoadMoreButton:boolean
}
const initialLastQuizResult: lastQuizResult = {
    lastQuizCorrectAnswers: 0,
    lastQuizDoneDate: null,
    questionsUsed: [
    ]
}
const initialState: InitialQuizStatsType = {
    quizDone: 0,
    quizDoneAmount: 0,
    totalQuizPoints: 0,
    averageQuizValue: 0,
    lastQuizResult: initialLastQuizResult,
    detailsOpen: false,
    isLoading:false,
    leaderboard:[],
    leaderboardListPart:1,
    disableLoadMoreButton:false,
};
const getQuizStats = createAsyncThunk(
    "quizStatsSlice/getQuizStats",
    async (id:string) => {
        try {
            const response = await customFetch.get(`/quizStats?id=${id}`);
            return { data: response.data };
        } catch (error: any) {
            throw error;
        }
    }
);
const getLeaderboard = createAsyncThunk(
    "quizStatsSlice/getLeaderboard",
    async (_,thunkAPI) => {
        const state = thunkAPI.getState() as { quizStats: InitialQuizStatsType };
        const listPart = state.quizStats.leaderboardListPart;
        try {
            const response = await customFetch.get(`/quizStats/leaderboard?listPart=${listPart}`);
            return { data: response.data };
        } catch (error: any) {
            throw error;
        }
    }
);
const quizStatsSlice = createSlice({
    name: "quizStatsSlice",
    initialState,
    reducers: {
        detailsToggle: (state): void => {
            state.detailsOpen = !state.detailsOpen
        },
        loadMoreList : (state): void => {
            state.leaderboardListPart = state.leaderboardListPart + 1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getQuizStats.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getQuizStats.fulfilled, (state, action) => {
            const {data} = action.payload;
            const {averageQuizValue,lastQuizResult,quizDoneAmount,totalQuizPoints} = data;
            const {lastQuizCorrectAnswers,lastQuizDoneDate,questionsUsed} = lastQuizResult;
            state.isLoading = false;
            state.quizDoneAmount = quizDoneAmount;
            state.averageQuizValue = averageQuizValue;
            state.totalQuizPoints = totalQuizPoints;
            // object within object
            state.lastQuizResult.lastQuizCorrectAnswers = lastQuizCorrectAnswers;
            state.lastQuizResult.lastQuizDoneDate = lastQuizDoneDate;
            state.lastQuizResult.questionsUsed = questionsUsed;
        });
        builder.addCase(getQuizStats.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getLeaderboard.fulfilled, (state,action) => {
            const {leaderboard} = action.payload.data;
            if(leaderboard.length < 1){
                state.disableLoadMoreButton = true
                return
            }
            state.leaderboard = [...state.leaderboard, ...leaderboard];
        });
    },
});
export const {
    detailsToggle,
    loadMoreList
} = quizStatsSlice.actions;
export { getQuizStats,getLeaderboard, };
export default quizStatsSlice.reducer;