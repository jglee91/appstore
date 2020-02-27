// import React, { useEffect } from 'react';
// import { asyncAuthUser } from '../modules/user';
// import { useDispatch } from 'react-redux';

// export default function Auth(WrappedComponent) {
//   function temp(props) {
//     const dispatch = useDispatch();

//     useEffect(() => {
//       dispatch(asyncAuthUser()).then(response => {
//         console.log(response);
//       });
//     }, []);

//     return (
//       <WrappedComponent {...props} />
//     );
//   }
//   return temp;
// }
