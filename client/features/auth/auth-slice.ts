import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;

            localStorage.setItem('user', user)
            localStorage.setItem('token', token)
        },

        logout: (state) => {
            state.user = null
            state.token = null

            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    }
})

export default authSlice.reducer;
export const { logout, setCredentials } = authSlice.actions