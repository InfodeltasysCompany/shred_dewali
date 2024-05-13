// scrapReducer.ts
import { MY_SCRAP_DETAILS, CHOOSEN_DATE_TIME } from '../cosntants';

interface ScrapState {
  scrapDetails: any;
  chosenDateTime: string | null;
}

const initialState = {
  scrapDetails: '', // Initial value for scrapDetails
  chosenDateTime: '', // Initial value for chosenDateTime
};

const myScrapDetailsReducer = (state = initialState, action: { type: string; payload: any }): ScrapState => {
  switch (action.type) {
    case MY_SCRAP_DETAILS:
      return {
        ...state,
        scrapDetails: action.payload,
      };
    case CHOOSEN_DATE_TIME:
      return {
        ...state,
        chosenDateTime: action.payload,
      };
    default:
      return state;
  }
};

export default myScrapDetailsReducer;
