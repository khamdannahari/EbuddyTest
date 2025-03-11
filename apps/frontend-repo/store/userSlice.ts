import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  loadingLoadMore: boolean;
  error: string | null;
}

const initialState: UserState = {
  email: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  loadingLoadMore: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{ email: string; token: string }>
    ) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    clearUserData: (state) => {
      state.email = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoadingLoadMore: (state, action: PayloadAction<boolean>) => {
      state.loadingLoadMore = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUserData,
  clearUserData,
  setLoading,
  setLoadingLoadMore,
  setError,
} = userSlice.actions;
export default userSlice.reducer;
