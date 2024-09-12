import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './index'

type AuthState = {
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { token: null } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { token }, }: PayloadAction<{ token: string }>,) => {
      state.token = token
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const isAuth = (state: RootState) => !!state.auth.token