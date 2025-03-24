import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from "@mui/material";


export default function TaskCoverageModal({ open, handleClose }) {
    const taskCoverageData = [
        { label: "Accepted", value: "0%" },
        { label: "Completed", value: "100%" },
        { label: "Not Accepted", value: "-1%" },
        { label: "Partially Completed", value: "50%" },
      ];
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Task Coverage"}
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-description">
       <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
        <div>Accepted</div>
        <div>0%</div>
       </div>
       <div>
        <div>Completed</div>
        <div>100%</div>
       </div>
       <div>
        <div>Not Accepted</div>
        <div>-1%</div>
       </div>
       <div>
        <div>Partially Completed</div>
        <div>50%</div>
       </div>
        </DialogContentText> */}
         {taskCoverageData.map((item, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            mb={1}
          >
            <Typography>{item.label}</Typography>
            <Typography>{item.value}</Typography>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
