import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/helperFunctions";
import { getObjectFromLocalStorage,addItemToLocalStorage,removeItemFromLocalStorage } from "../../utils/localStorage";
import { toast } from "react-toastify";

export type LoginActionType = {
    name: string,
    userId: string,
    role: string,
    email: string,
}
export type InitialStateType = {
    isLoading: boolean,
    role: string,
    message: string | undefined,
    name: string,
    email: string,
    userId: string,
    isLoggedIn: boolean,
    feedbackState: boolean,
}
const initialState: InitialStateType = {
    isLoading: false,
    role: getObjectFromLocalStorage("user").role,
    message: "",
    name: getObjectFromLocalStorage("user").name,
    email: getObjectFromLocalStorage("user").email,
    userId: getObjectFromLocalStorage("user").userId,
    isLoggedIn: false,
    feedbackState: false,
};
const loginUser = createAsyncThunk(
    "userSlice/loginUser",
    async ({ email, password }: { email: string, password: string }, thunkAPI) => {
        try {
            const response = await customFetch.post("/auth/login", {
                email,
                password,
            });
            addItemToLocalStorage(response.data.user,"user");
            return { data: response.data };
        } catch (error: any) {
            const errorMessage = error.response.data.msg;
            console.log(errorMessage);
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);
const logoutUser = createAsyncThunk(
    "userSlice/logoutUser",
    async (_, thunkAPI) => {
        try {
            await customFetch.delete("/auth/logout");
            removeItemFromLocalStorage("user");
        } catch (error: any) {
            const errorMessage = error.message;
            return thunkAPI.rejectWithValue(errorMessage);

        }
    }
);
const registerUser = createAsyncThunk(
    "userSlice/registerUser",
    async ({ name, email, password }: { name: string, email: string, password: string }, thunkAPI) => {
        try {
            const response = await customFetch.post("/auth/register", { name, email, password });
            return { data: response.data }
        } catch (error: any) {
            const errorMessage = error.response.data.msg;
            return thunkAPI.rejectWithValue(errorMessage);

        }
    }
);
const changeUser = createAsyncThunk(
    "userSlice/changeUser",
    async ({ name, email }: { name: string, email: string }, { dispatch }) => {
        try {
            const response = await customFetch.patch("/auth/change-user", { name, email });
            toast.success(response.data.msg);
            dispatch(logoutUser());
            return { data: { name, email } }
        } catch (error: any) {
            toast.error(error.response.data.msg)
            throw error;
        }
    }
);

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const { name, userId: id, role, email } = action.payload?.data?.user;
            state.isLoading = false;
            state.role = role;
            state.name = name;
            state.userId = id;
            state.email = email;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload as string;
        });
        builder.addCase(logoutUser.fulfilled, (): InitialStateType => {
            return { ...initialState,role:"",name:"",email:"",userId:"" }
        });
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            const { email } = action.payload.data.user;
            console.log(action.payload.data);
            state.message = `Success, verification link has been sent to your email ${email}`;
            state.isLoading = false;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload as string;
        });
    },
});
export const {
} = userSlice.actions;
export { loginUser, logoutUser, registerUser, changeUser };
export default userSlice.reducer;