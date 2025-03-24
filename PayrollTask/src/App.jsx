import React from 'react'
import Login from './pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routing } from './router/routing'
const App = () => {
  return (
    <>
    
    <RouterProvider router={routing}/>
    </>
  )
}
export default App
// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { routing } from "./router/routing";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// const App = () => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <RouterProvider router={routing} />
//     </LocalizationProvider>
//   );
// };

// export default App;
