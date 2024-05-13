// sAddressReducer.ts
import { SET_ADDRESS } from "../cosntants"; 

interface AddressState {
  address: any; // Your address JSON object
}

const initialState: AddressState = {
  address: {}, // Initial empty object
};

const sAddressReducer = (state = initialState, action: any): AddressState => {
  switch (action.type) {
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};

export default sAddressReducer;
