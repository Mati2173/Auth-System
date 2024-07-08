import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI from '../actions/authService';

export const signIn = createAsyncThunk(
	'auth/signIn/',
	async ({ email, password }, thunkAPI) => {
		// Complete...
	}
);

const initialState = {
	accessToken: localStorage.getItem('accessToken'),
	refreshToken: localStorage.getItem('refreshToken'),
	isAuthenticated: null,
	user: null,
	status: 'uninitialized',
	error: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signOut(state) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');

			state.accessToken = null;
			state.refreshToken = null;
			state.isAuthenticated = false;
			state.user = null;
			state.status = 'uninitialized';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(signIn.fulfilled, (state, action) => {
				const { access, refresh, user } = action.payload;

				state.isAuthenticated = true;
				state.accessToken = access;
				state.refreshToken = refresh;
				state.user = user;
				state.status = 'succeeded';
				state.error = null;

				localStorage.setItem('accessToken', access);
				localStorage.setItem('refreshToken', refresh);
			})
			.addCase(signIn.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
