import { createSlice } from '@reduxjs/toolkit';
// =============================================
import CONSTANTS from '../../constants';
// =============================================
import restController from '../../api/rest/restController';
// =============================================
import {
  decorateAsyncThunk,
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from '../../utils/store';

const initialState = {
  isFetching: false,
  error: null,
};

export const checkAuth = decorateAsyncThunk({
  key: `${CONSTANTS.AUTH_SLICE_NAME}/checkAuth`,
  thunk: async ({ data: authInfo, navigate, authMode }) => {
    authMode === CONSTANTS.AUTH_MODE.LOGIN
      ? await restController.loginRequest(authInfo)
      : await restController.registerRequest(authInfo);
    navigate('/', { replace: true });
  },
});

const reducers = {
  clearAuthError: (state) => {
    state.error = null;
  },
  clearAuth: () => initialState,
};

const extraReducers = (builder) => {
  builder.addCase(checkAuth.pending, pendingReducer);
  builder.addCase(checkAuth.fulfilled, fulfilledReducer);
  builder.addCase(checkAuth.rejected, rejectedReducer);
};

const authSlice = createSlice({
  name: `${CONSTANTS.AUTH_SLICE_NAME}`,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = authSlice;

export const { clearAuthError, clearAuth } = actions;

export default reducer;
