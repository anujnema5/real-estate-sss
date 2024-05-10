import { createSlice } from "@reduxjs/toolkit";

export type TInitialState = {

}

const initialState: TInitialState = {
    theme: 'system',
    location: null
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setTheme: () => { },
        setLocation: () => { }
    }
})

export default configSlice.reducer
export const { setLocation, setTheme } = configSlice.actions