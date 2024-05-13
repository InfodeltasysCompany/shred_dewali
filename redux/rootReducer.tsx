import { combineReducers } from 'redux';
// import dashboardReducer from './reducers/dashboardReducer';
import dashboardReducer from './reducers/dashReducer';
import loginReducer from './reducers/loginReducer';

import myScrapDetailsReducer from './reducers/myScrapDetailsReducer';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  logindata:loginReducer,
  
  myscrap:myScrapDetailsReducer
  // Add other reducers here if needed
});

export default rootReducer;
