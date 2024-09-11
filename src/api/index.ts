import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {RootState} from '@/store';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v3/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        auth: builder.mutation({
            query: (body) => ({
                url: 'auth/login ',
                method: 'POST',
                body,
            }),
    }),
    }),
})

export const {
    useAuthMutation
} = api;