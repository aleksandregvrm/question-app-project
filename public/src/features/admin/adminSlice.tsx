import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/helperFunctions";
import { AllUserStatsType } from "../../types/adminTypes";
import { toast } from "react-toastify";
import { InitialAdminType } from "../../types/adminTypes";

const initialState: InitialAdminType = {
    isLoading: false,
    allUserStats: [],
    singleUserStats: [],
    editingRole: "",
    editingId: "",
    detailsOpen: false,
};
const getAllQuizStats = createAsyncThunk(
    "adminSlice/getAllQuizStats",
    async () => {
        try {
            const response = await customFetch.get("/ad-controls/allQuizStats")
            return { data: response.data }
        } catch (error: any) {
            throw error;
        }
    }
);
const getSingleQuizStat = createAsyncThunk("adminSlice/getSingleStat", async (id: string) => {
    try {
        const response = await customFetch.get(`/ad-controls/singleQuizStat?id=${id}`);
        return { data: response.data }
    } catch (error) {
        throw error;
    }
})
const deleteUser = createAsyncThunk("adminSlice/deleteUser", async (id: string, thunkAPI) => {
    try {
        const response = await customFetch.delete(`/auth/delete-user?id=${id}`);
        toast.success(response.data.msg);
        thunkAPI.dispatch(getAllQuizStats());
    } catch (error) {
        throw error;
    }
})
const changeUserRole = createAsyncThunk("adminSlice/changeUserRole",async (_,thunkAPI)=>{
    try {
        const state = thunkAPI.getState() as { admin:InitialAdminType  };
        const { editingRole,editingId } = state.admin;
        const response = await customFetch.patch('/ad-controls/changeRole',{editingRole,editingId});
        toast.success(response.data.msg)
        thunkAPI.dispatch(getAllQuizStats())
    } catch (error) {
        throw error;
    }
})
const adminSlice = createSlice({
    name: "adminSlice",
    initialState,
    reducers: {
        setEditingRoleId: (state, action) => {
            const { id, role } = action.payload;
            state.editingId = id;
            state.editingRole = role
        },
        toggleDetails: (state) => {
            console.log('details toggled');
            state.detailsOpen = !state.detailsOpen;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllQuizStats.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllQuizStats.fulfilled, (state, action) => {
            state.isLoading = false;
            const { allUserStats } = action?.payload?.data;
            state.allUserStats = allUserStats.sort((a: AllUserStatsType, b: AllUserStatsType) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
        });
        builder.addCase(getAllQuizStats.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getSingleQuizStat.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getSingleQuizStat.fulfilled, (state, action) => {
            state.isLoading = false;
            const { singleUserStat } = action?.payload?.data;
            state.singleUserStats = singleUserStat
        });
        builder.addCase(getSingleQuizStat.rejected, (state) => {
            state.isLoading = false;
        });
    }
});
export const {
    setEditingRoleId, toggleDetails
} = adminSlice.actions;
export { getAllQuizStats, getSingleQuizStat, changeUserRole, deleteUser };
export default adminSlice.reducer;