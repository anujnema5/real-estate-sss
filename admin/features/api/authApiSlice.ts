import apiSlice from "@/store/api/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
            signIn: builder.mutation({
                query: (credentials) => ({
                    url: '/auth/sign-in',
                    method: 'POST',
                    body: { ...credentials },
                    providedTags: ['auth']
                })
            }),

            signUp: builder.mutation({
                query: (credentials) => ({

                })
            }),

            logOut : builder.mutation({
                query: ()=> ({
                    url: '/auth/logout',
                    method: 'POST',
                    providedTags: ['auth']
                })
            })
        }
    }
})

export const { useSignInMutation, useSignUpMutation, useLogOutMutation } = authApiSlice;