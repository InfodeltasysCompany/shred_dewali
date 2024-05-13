// datetimeReducer.ts

import { SET_CURRENT_DATE_TIME,SET_FORMATTED_DATE_TIME } from "../cosntants";
interface DateTimeState {
  currentDateTime: Date;
  formattedDateTime: string;
}

const initialState: DateTimeState = {
  currentDateTime: new Date(),
  formattedDateTime: '',
};

const datetimeReducer = (state = initialState, action: any): DateTimeState => {
  switch (action.type) {
    case SET_CURRENT_DATE_TIME:
      return {
        ...state,
        currentDateTime: action.payload,
      };
    case SET_FORMATTED_DATE_TIME:
      return {
        ...state,
        formattedDateTime: action.payload,
      };
    default:
      return state;
  }
};

export default datetimeReducer;
