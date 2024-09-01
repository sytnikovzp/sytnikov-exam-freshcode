import { createSlice } from '@reduxjs/toolkit';
// =============================================
import constants from '../../constants';
// =============================================
import restController from '../../api/rest/restController';
// =============================================
import {
  decorateAsyncThunk,
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from '../reduxUtils';

const initialState = {
  isFetching: false,
  error: null,
};

export const checkAuth = decorateAsyncThunk({
  key: `${constants.AUTH_SLICE_NAME}/checkAuth`,
  thunk: async ({ data: authInfo, navigate, authMode }) => {
    if (authMode === constants.AUTH_MODE.LOGIN) {
      await restController.loginRequest(authInfo);
    } else {
      await restController.registerRequest(authInfo);
    }
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
  name: `${constants.AUTH_SLICE_NAME}`,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = authSlice;

export const { clearAuthError, clearAuth } = actions;

export default reducer;
