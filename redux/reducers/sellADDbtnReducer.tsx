// sellADDbtnReducer.ts
// import { SET_SELL_FORM_DATA } from './sellADDbtnAction';
import { SET_SELL_FORM_DATA } from "../cosntants";

interface SellFormDataState {
  formData: FormData | null;
}

const initialState: SellFormDataState = {
  formData: null,
};

const sellADDbtnReducer = (state = initialState, action: any): SellFormDataState => {
  switch (action.type) {
    case SET_SELL_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};

export default sellADDbtnReducer;
