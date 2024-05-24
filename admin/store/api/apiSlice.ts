import { logout, setAuthenticated } from '@/features/auth/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8500/v1/admin',
    credentials: 'include',
    mode: 'cors',

    prepareHeaders: (headers, { getState }: { getState: any }) => {
        const token = getState().auth.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }

        return headers;
    }
})

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 403) {
        // TOKEN EXPIRED
        const refreshResult: any = await baseQuery('/admin/auth/refresh', api, { method: 'POST' });

        if (result.data) {
            const admin = api.getState().auth.admin;
            const accessToken = refreshResult.data.data.accessToken;

            api.dispatch(setAuthenticated({ admin, accessToken }))

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout())
        }
    }

    return result;
}

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReAuth,
    endpoints: builder => ({})
})

export default apiSlice