import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        Start: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        createUserSuccess: (state) =>{
            state.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = true;
            state.users = action.payload;
        },
        loginSuccess: (state,action) => {
            state.isFetching = true;
            state.currentUser = action.payload;
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        logoutSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = true;
        },
        updateUserSuccess: (state, action) => {
            state.isFetching = true;
            state.currentUser = action.payload;
        },
        deleteUserSuccess: (state, action) => {
            state.isFetching = false;
            state.users = state.users.filter( user => user._id !== action.payload);
            // state.users = state.users.splice(
            //     state.users?.findIndex( function (user) { return user._id === action.payload;}), 1);
        },
        Failure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {Start, createUserSuccess, getUsersSuccess, loginSuccess, getUserSuccess, logoutSuccess, updateUserSuccess,  deleteUserSuccess, Failure } = userSlice.actions;
export default userSlice.reducer;