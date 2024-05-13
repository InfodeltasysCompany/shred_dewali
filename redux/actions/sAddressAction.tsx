import { SET_ADDRESS } from "../cosntants";
export const setAddress = (address: any) => ({
    type: SET_ADDRESS,
    payload: address,
  });


///////use ////

//   import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setAddress } from './sAddressAction'; // Adjust the path accordingly

// const YourComponent: React.FC = () => {
//   const dispatch = useDispatch();
//   const address = useSelector((state: any) => state.address.address);

//   const updateAddress = () => {
//     // Example of setting/updating the address
//     const newAddress = { /* Your updated address object */ };
//     dispatch(setAddress(newAddress));
//   };

//   // Your component logic
//   return (
//     // Your component JSX
//   );
// };

// export default YourComponent;
