import { configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';

// import rootReducer from './rootReducer';
import rootReducer from './rootReducer';
// import { watchFetchData } from './sagas/dashSaga'; // Assuming it's in the correct path
import { watchFetchData } from './saga/dashSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  
  middleware: [sagaMiddleware],

});

sagaMiddleware.run(watchFetchData);

export default store;
