// export const FETCH_DATA = 'FETCH_DATA';
// export const FETCH_SUCCESS = 'FETCH_SUCCESS';
// export const FETCH_FAILURE = 'FETCH_FAILURE';
// export const SET_LOGIN_DATA= 'SET_LOGIN_DATA';
// ///////////

// // constants.js
// export const SET_USER_DATA = 'SET_USER_DATA';
// ////Sell constants
// export const SET_SELL_DATA = 'SET_SELL_DATA';
// /////sell currentdatatime scheduledate time
// export const SET_CURRENT_DATE_TIME = 'SET_CURRENT_DATE_TIME';
// export const SET_FORMATTED_DATE_TIME = 'SET_FORMATTED_DATE_TIME';
// /////myScrap ////
// export const ADD_SCRAP_DATA = 'ADD_SCRAP_DATA';
// export const REMOVE_SCRAP_DATA = 'REMOVE_SCRAP_DATA';
// ////sAddress///
// export const SET_ADDRESS = 'SET_ADDRESS';
// ///sellAddbtn//
// export const SET_SELL_FORM_DATA = 'SET_SELL_FORM_DATA';


// export const MY_SCRAP_DETAILS='MY_SCRAP_DETAILS'
// export const CHOOSEN_DATE_TIME='CHOOSEN_DATE_TIME'


export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const SET_LOGIN_DATA= 'SET_LOGIN_DATA';
///////////

// constants.js
export const SET_USER_DATA = 'SET_USER_DATA';
////Sell constants
export const SET_SELL_DATA = 'SET_SELL_DATA';
/////sell currentdatatime scheduledate time
export const SET_CURRENT_DATE_TIME = 'SET_CURRENT_DATE_TIME';
export const SET_FORMATTED_DATE_TIME = 'SET_FORMATTED_DATE_TIME';
/////myScrap ////
export const ADD_SCRAP_DATA = 'ADD_SCRAP_DATA';
export const REMOVE_SCRAP_DATA = 'REMOVE_SCRAP_DATA';
////sAddress///
export const SET_ADDRESS = 'SET_ADDRESS';
///sellAddbtn//
export const SET_SELL_FORM_DATA = 'SET_SELL_FORM_DATA';


export const MY_SCRAP_DETAILS='MY_SCRAP_DETAILS'
export const CHOOSEN_DATE_TIME='CHOOSEN_DATE_TIME'

export interface RootState {
    
    logindata: LoginState;
   
    // Add other state slices if needed
  }

  export interface LoginState {
    userData: any; // Adjust the type based on your actual data structure
    // Add other properties if needed
  }