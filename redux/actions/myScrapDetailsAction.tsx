import { MY_SCRAP_DETAILS, CHOOSEN_DATE_TIME } from '../cosntants';

export const myScrapDetailsAction = (details: any) => ({
  type: MY_SCRAP_DETAILS,
  payload: details,
});

export const chosenDateTimeAction = (dateTime: string) => ({
  type: CHOOSEN_DATE_TIME,
  payload: dateTime,
});
