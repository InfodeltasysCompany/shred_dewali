import { ADD_SCRAP_DATA,REMOVE_SCRAP_DATA } from "../cosntants";
export const addScrapData = (data: any) => ({
    type: ADD_SCRAP_DATA,
    payload: data,
  });
  
  export const removeScrapData = (index: number) => ({
    type: REMOVE_SCRAP_DATA,
    payload: index,
  });


  ////////////////////////////////use////
//   import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addScrapData, removeScrapData } from './myScrapAction'; // Adjust the path accordingly

// const YourComponent: React.FC = () => {
//   const dispatch = useDispatch();
//   const scrapData = useSelector((state: any) => state.scrap.scrapData);

//   const addData = () => {
//     // Example of adding data
//     const newData = { /* Your new data */ };
//     dispatch(addScrapData(newData));
//   };

//   const removeData = (index: number) => {
//     // Example of removing data by index
//     dispatch(removeScrapData(index));
//   };

//   // Your component logic
//   return (
//     // Your component JSX
//   );
// };

// export default YourComponent;
