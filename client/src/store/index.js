import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
// =============================================
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import dataForContestReducer from './slices/dataForContestSlice';
import paymentReducer from './slices/paymentSlice';
import contestsReducer from './slices/contestsSlice';
import contestCreationReducer from './slices/contestCreationSlice';
import bundleReducer from './slices/bundleSlice';
import contestByIdReducer from './slices/contestByIdSlice';
import contestUpdationReducer from './slices/contestUpdationSlice';
import chatReducer from './slices/chatSlice';
import userProfileReducer from './slices/userProfileSlice';
// =============================================
import { initSocket } from '../api/ws/socketController';

const store = configureStore({
  reducer: {
    auth: authReducer,
    userStore: userReducer,
    dataForContest: dataForContestReducer,
    payment: paymentReducer,
    contestsList: contestsReducer,
    contestCreationStore: contestCreationReducer,
    bundleStore: bundleReducer,
    contestByIdStore: contestByIdReducer,
    contestUpdationStore: contestUpdationReducer,
    chatStore: chatReducer,
    userProfile: userProfileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

initSocket(store);

export default store;
