// myScrapReducer.ts
import { ADD_SCRAP_DATA,REMOVE_SCRAP_DATA } from "../cosntants";

interface ScrapState {
  scrapData: any[]; // Your JSON array data
}

const initialState: ScrapState = {
  scrapData: [],
};

const myScrapReducer = (state = initialState, action: any): ScrapState => {
  switch (action.type) {
    case ADD_SCRAP_DATA:
      return {
        ...state,
        scrapData: [...state.scrapData, action.payload],
      };
    case REMOVE_SCRAP_DATA:
      return {
        ...state,
        scrapData: state.scrapData.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export default myScrapReducer;
