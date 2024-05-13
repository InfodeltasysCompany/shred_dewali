// import { FETCH_SUCCESS, FETCH_FAILURE } from '../constants';
import { FETCH_FAILURE,FETCH_SUCCESS } from "../cosntants";

const initialState = {
  data: [],
  error: null,
};

const dashReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dashReducer;
