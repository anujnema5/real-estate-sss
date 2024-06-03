import { getEntityFromLocalStorage } from "@/utils/helper";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";

const initialState = {
    user: getEntityFromLocalStorage('user') as any,
    token: getEntityFromLocalStorage('token') as any,
    subscription: getEntityFromLocalStorage('subscription') as any
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            console.log({ user, token })
            state.user = user;
            state.token = token;

            if (user.subscription) {
                state.subscription = user.subscription
                localStorage.setItem('subscription', JSON.stringify(user.subscription))
            }

            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', JSON.stringify(token))
        },

        logout: (state) => {
            state.user = null
            state.token = null

            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('subscription')
        }
    }
})

export default authSlice.reducer;
export const { logout, setCredentials } = authSlice.actions