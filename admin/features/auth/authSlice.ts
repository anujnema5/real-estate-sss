import { RootState } from "@/store/store";
import { getEntityFromLocalStorage } from "@/utils/helper";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    admin: null | Object,
    token: null | string
}

const initialState: TInitialState = {
    admin: getEntityFromLocalStorage('admin'),
    token: getEntityFromLocalStorage('accessToken')
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            const { admin, accessToken } = action.payload;

            state.admin = admin;
            state.token = accessToken

            localStorage.setItem('admin', JSON.stringify(admin));
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
        },

        logout: (state) => {
            state.admin = null;
            state.token = null

            localStorage.removeItem('admin');
            localStorage.removeItem('accessToken');
        }
    }
})

export const getAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
export const { setAuthenticated, logout } = authSlice.actions