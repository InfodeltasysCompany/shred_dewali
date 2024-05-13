import { SET_CURRENT_DATE_TIME,SET_FORMATTED_DATE_TIME } from "../cosntants";
export const setCurrentDateTime = (dateTime: Date) => ({
    type: SET_CURRENT_DATE_TIME,
    payload: dateTime,
  });
  
  export const setFormattedDateTime = (formattedDateTime: string) => ({
    type: SET_FORMATTED_DATE_TIME,
    payload: formattedDateTime,
  });


  //////////////////////////////////use of sdatetime redux////
  // DisplayDateTime.tsx
// import React from 'react';
// import { useSelector } from 'react-redux';

// const DisplayDateTime: React.FC = () => {
//   const { currentDateTime, formattedDateTime } = useSelector((state: any) => state.datetime);

//   return (
//     <div>
//       <p>Current Date Time: {currentDateTime.toString()}</p>
//       <p>Formatted Date Time: {formattedDateTime}</p>
//     </div>
//   );
// };

// export default DisplayDateTime;


//////////////////////////
// UpdateDateTime.tsx
// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setCurrentDateTime, setFormattedDateTime } from './datetimeActions'; // Adjust the path accordingly

// const UpdateDateTime: React.FC = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const currentDate = new Date();
//     dispatch(setCurrentDateTime(currentDate));

//     const options = { /* Your date formatting options */ };
//     const formattedDate = currentDate.toLocaleString('en-US', options);
//     dispatch(setFormattedDateTime(formattedDate));
//   }, [dispatch]);

//   return (
//     <div>
//       {/* Additional content if needed */}
//     </div>
//   );
// };

// export default UpdateDateTime;
