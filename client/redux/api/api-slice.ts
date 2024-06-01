import { logout, setCredentials } from "@/features/auth/auth-slice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.SERVER_URL || 'http://localhost:8500/v1',
    credentials: 'include',
    mode: 'cors',

    prepareHeaders: (headers, { getState }: { getState: any }) => {
        const accessToken = getState().auth.accessToken;

        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`)
        }

        return headers;
    }
})

// ARGS - MEANS ROUTES - /
// API - WITH API OBJECT YOU CAN GRAB STATE OBJECT AND DISPATCH FUNCTION
// EXTRAOPTIONS - WE CAN BE MORE SPEICIFIC WHEN SENDING, REQUEST TO SERVER, WE CAN SET SPECIFIC TYPE OF REQUEST

const fetchBaseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        // THAT MEANS TOKEN EXPIRED
        const refreshResult: any = await baseQuery('/auth/refresh', api, { method: 'POST' });

        if (refreshResult.data) {
            const admin = refreshResult.data.data.user;
            const token = refreshResult.data.data.token;

            api.dispatch(setCredentials({ admin, token }))
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout())
            // LOGOUT USER HERE
        }

    }
    return result;
}

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQueryWithReAuth,
    endpoints: builder => ({})
}) 

export default apiSlice;