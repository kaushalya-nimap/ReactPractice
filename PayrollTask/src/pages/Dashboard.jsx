// import React from "react";
// import Sidebar from "../components/SideBar";
// import Navbar from "../components/Navbar";

// const Dashboard = () => {
//   return (
//     <div style={{display:'flex',flexDirection:'row'}}>
//       <div style={{width:"30%"}}>
//         <Sidebar />
//       </div>
//       <div style={{width:"70%"}}>
//         <Navbar />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>Dashboard</div>
//   )
// }

// export default Dashboard
import React, { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'
import dayjs from 'dayjs'

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Initializing with dayjs()

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default Dashboard;

