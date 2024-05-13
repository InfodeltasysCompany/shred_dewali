// loginAction.ts
import { SET_LOGIN_DATA } from "../cosntants";

export const setLoginData = (jsondata: any) => ({
  type: SET_LOGIN_DATA,
  payload: jsondata,
});
