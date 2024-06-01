import apiSlice from "@/redux/api/api-slice";
import { createApi } from "@reduxjs/toolkit/query/react";

const authApis = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
            signIn: builder.mutation({
                query: (credentials) => ({

                })
            }),

            sendOTP: builder.mutation({
                query: (credentials) => ({
                    url: '/auth/initiate-otp',
                    body: { ...credentials },
                    method: 'POST',
                    providesTags: ['user']
                })
            }),

            confirmOTP: builder.mutation({
                query: (credentials) => ({
                    url: '/auth/confirm-otp',
                    body: { ...credentials },
                    method: 'POST',
                    providesTags: ['user']
                })
            }),

            refresh: builder.mutation({
                query: () => ({
                    url: '/auth/refresh',
                    method: 'POST',
                    providesTags: ['user']
                })
            })
        }
    }
})

export const { useSendOTPMutation, useConfirmOTPMutation, useRefreshMutation } = authApis