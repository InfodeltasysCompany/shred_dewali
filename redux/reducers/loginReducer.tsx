// loginReducer.ts
import { SET_LOGIN_DATA } from "../cosntants";

interface State {
    data: any[];
  }
  
  const initialState: State = {
    data: [],
  };

const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
      // Update state with the payload from the action
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
