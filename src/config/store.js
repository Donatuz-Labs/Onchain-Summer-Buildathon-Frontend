import { configureStore } from '@reduxjs/toolkit';

import auth from '../reducers/auth';
import signUp from '../reducers/signUp';
import profile from '../reducers/profile';

const store = configureStore({
  reducer: {
    auth,
    signUp,
    profile
  },
});

export default store;
