import { createSlice } from "@reduxjs/toolkit";

export type TInitialState = {
    theme: string,
    location: null | string,
    otpInitiated: boolean
}

const initialState: TInitialState = {
    theme: 'system',
    location: null,
    otpInitiated: false
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setTheme: () => { },
        setLocation: () => { },
        setOTPInitiated : (state, action)=> {
            state.otpInitiated = action.payload
        }
    }
})

export default configSlice.reducer
export const { setLocation, setTheme, setOTPInitiated } = configSlice.actions