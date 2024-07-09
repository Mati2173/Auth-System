import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPI from '../actions/authService';

const getUser = createAsyncThunk(
	'auth/getUser/',
	async (accessToken, thunkAPI) => {
		try {
			const userResponse = await authAPI.getUser(accessToken);

			if (!userResponse.user)
				return thunkAPI.rejectWithValue(userResponse);
			else
				return { user: userResponse.user };
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const signIn = createAsyncThunk(
	'auth/signIn/',
	async ({ email, password }, thunkAPI) => {
		try {
			const jwtResponse = await authAPI.createJWT({ email, password });

			if (!jwtResponse.created)
				return thunkAPI.rejectWithValue(jwtResponse);
			else {
				thunkAPI.dispatch(getUser(jwtResponse.access));
				return {
					accessToken: jwtResponse.access,
					refreshToken: jwtResponse.refresh,
				};
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const verifySession = createAsyncThunk(
	'auth/verifySession/',
	async (_, thunkAPI) => {
		try {
			const state = thunkAPI.getState()
			const accessToken = state.auth.accessToken;

			if(!accessToken) {
				thunkAPI.dispatch(signOut());
				return thunkAPI.rejectWithValue();
			}

			const jwtResponse = await authAPI.verifyJWT(accessToken);

			if (!jwtResponse.verified) {
				thunkAPI.dispatch(signOut());
				return thunkAPI.rejectWithValue();
			} else {
				thunkAPI.dispatch(getUser(accessToken));
				return { isAuthenticated: true };
			}
		} catch (error) {
			thunkAPI.dispatch(signOut());
			return thunkAPI.rejectWithValue();
		}
	}
);

const initialState = {
	accessToken: localStorage.getItem('accessToken'),
	refreshToken: localStorage.getItem('refreshToken'),
	isAuthenticated: null,
	user: null,
	isStaff: null,
	status: 'uninitialized',
	error: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signOut(state, action) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');

			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			// Verify Session Reducer
			.addCase(verifySession.pending, (state) => {
				state.status = 'verifying session';
				state.error = null;
			})
			.addCase(verifySession.fulfilled, (state, action) => {
				state.isAuthenticated = action.payload.isAuthenticated;
				state.status = 'session verified';
				state.error = null;
			})
			.addCase(verifySession.rejected, (state) => {
				state.status = 'session verification failed';
				state.error = null;
			})
			// Sign In Reducer
			.addCase(signIn.pending, (state) => {
				state.status = 'signing in';
				state.error = null;
			})
			.addCase(signIn.fulfilled, (state, action) => {
				const { accessToken, refreshToken } = action.payload;

				state.isAuthenticated = true;
				state.accessToken = accessToken;
				state.refreshToken = refreshToken;
				state.status = 'succeeded sign in';
				state.error = null;

				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', refreshToken);
			})
			.addCase(signIn.rejected, (state, action) => {
				state.isAuthenticated = false;
				state.status = 'sign in failed';
				state.error = action.payload;
			})
			// Get user Reducer
			.addCase(getUser.pending, (state) => {
				state.status = 'loading user';
				state.error = null;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				const { user } = action.payload;

				state.user = user;
				state.isStaff = user.is_staff;
				state.status = 'user loaded';
				state.error = null;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.status = 'user loading failed';
				state.error = action.payload;
			});
	},
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
