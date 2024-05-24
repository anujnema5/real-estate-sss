import apiSlice from "@/store/api/apiSlice";

const usersSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
            entity: builder.query({
                query: (query) => `/${query}`
            })
        }
    }
})

export const { useEntityQuery } = usersSlice