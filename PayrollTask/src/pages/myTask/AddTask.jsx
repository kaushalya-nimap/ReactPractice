import React, { useEffect, useState,useRef } from "react";
import Modal from "../../shared/modal/Modal";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../shared/formik/FormikControl";
import dayjs from "dayjs";
import { privatePost } from "../../services/privateRequest";
import { ADDTASK } from "../../services/apiEndpoints";
import toast from "react-hot-toast";
import { priorities } from "../../utils/utils";
import styles from "./AddTask.module.css";
import {  Delete } from "@mui/icons-material";

const AddTask = ({ closeModal, teamMembers }) => {
  const fileInputRef = useRef(null)
  console.log('fileInputRef', fileInputRef)
    const [fileObj,setFileObj]=useState([])
  //console.log('teamMembers', teamMembers)
  const SignupSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
    //members: Yup.array().required("This Field is Required"),
    date: Yup.string().required("this field is required"),
  });
  const initialValues = {
    title: "",
    description: "",
    members: "",
    date: "",
    ccMembers: "",
    priority: "",
    file: "",
  };
  const handleCloseFun = () => {
    closeModal();
  };
 
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract only Base64
      reader.onerror = (error) => reject(error);
    });
  };
  const handleFileDelete=()=>{
    setFileObj([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  }
  const handleSubmit = async (values) => {
    let base64File = "";
    if (fileObj) {
        console.log("true")
      base64File = await convertFileToBase64(fileObj);
      console.log('base64File', base64File)
     
    }
    
    
    const formattedDate = dayjs(values.date).format("DD MMM YYYY hh:mm A");
    const ccMembersObj = values.ccMember?values.ccMembers.map((option) => ({
      UserId: option.value,
      Name: option.label,
    })):"";

    const params = {
      AssignedBy: 1248,
      AssignedDate: "",
      AssignedToUserId: "",
      CompletedDate: "",
      Description: values.description,
      Id: base64File?base64File:"",
      Image: "",
      IntercomGroupIds: [],
      IsActive: true,
      Latitude: "",
      LeadId: "",
      Location: "",
      Longitude: "",
      MultimediaData: base64File || "",
      MultimediaExtension: fileObj
        ? fileObj.name.split(".").pop()
        : "",
       MultimediaFileName: fileObj ? fileObj.name.split(".")[0] : "", 
       MultimediaType: fileObj ? fileObj.type : "", 
      Priority: values.priority ? values.priority[0] : "",
      TaskDisplayOwners: values.ccMember?`${values.ccMembers.length} User${
        values.ccMembers.length > 1 ? "s" : ""
      }`:"",
      TaskEndDate: formattedDate,
      TaskEndDateDisplay: dayjs(values.date).toISOString(),
      TaskOwners: ccMembersObj,
      TaskStatus: "",
      Title: values.title,
      UserDisplayIds: `${values.members.length} User${
        values.members.length > 1 ? "s" : ""
      }`,
      UserIds: values.members,
    };
    // try {
    //   const res = await privatePost(ADDTASK, params);
    //   //console.log("res", res);
    //   toast.success("New task added successfully");
    //   console.log("Submitted values:", params);
    //   closeModal();
    // } catch (err) {
    //   toast.error("Error in submitting form");
    // }

    closeModal();
   console.log("Submitted values:", params);
  };
  useEffect(()=>{
    console.log('fileObj', fileObj)
  },[fileObj])

  return (
    <>
      <Modal header={"Add task"} closeModal={closeModal}>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <div>
                    <div style={{display:"flex",flexDirection:"column"}}>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Title"
                        placeholder="Enter Title"
                        name="title"
                        required={true}
                      />
                      <FormikControl
                        control="input"
                        type="text"
                        label="Description"
                        placeholder="Enter Description"
                        name="description"
                        required={true}
                      />
                    </div>
                    <div className={styles.row}>
                      <FormikControl
                        control="select"
                        label="Add Members"
                        name="members"
                        options={teamMembers.map((member) => ({
                          value: member.UserId,
                          label: member.Name,
                        }))}
                        isMulti={true}
                        required={true}
                      />
                      <FormikControl
                        control="select"
                        label="Add CC Members"
                        name="ccMembers"
                        options={teamMembers.map((member) => ({
                          value: member.UserId,
                          label: member.Name,
                        }))}
                        isMulti={true}
                        isCCMember={true}
                      />
                    </div>
                    <div className={styles.row}>
                      <FormikControl
                        control="select"
                        label="Select Priority"
                        name="priority"
                        options={priorities.map((priority) => ({
                          value: priority.value,
                          label: priority.label,
                        }))}
                        isMulti={false}
                      />
                      <FormikControl
                        control="datePicker"
                        label="Select a date"
                        name="date"
                        minDate={new Date()}
                        required={true}
                      />
                    </div>
                    <div>
                     
                      <input
                        type="file"
                        name="file"
                        label="Attach file"
                        onChange={(e)=>{
                            const file=e.target.files[0]
                            setFileObj(file)
                        }}
                        className={styles.fileAttach}
                        ref={fileInputRef}
                       
                      />
                     { fileObj.name&&<Delete style={{ cursor: "pointer", marginLeft: "8px" }} onClick={handleFileDelete}/>}
                    </div>
                  </div>

                  <div className={styles.btnDiv}>
                    <button
                      className={styles.addCancelBtn}
                      onClick={handleCloseFun}
                    >
                      Cancel
                    </button>
                    <button className={styles.addCancelBtn} type="submit">
                      Add
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Modal>
    </>
  );
};
export default AddTask;
// // import React, { useState } from "react";
// // import {
// //   Modal,
// //   Box,
// //   Typography,
// //   TextField,
// //   Button,
// //   Select,
// //   MenuItem,
// //   InputLabel,
// //   FormControl,
// //   OutlinedInput,
// //   Checkbox,
// //   ListItemText,
// // } from "@mui/material";
// // import { Formik, Form, Field } from "formik";
// // import * as Yup from "yup";
// // import { priority } from "../../utils/utils";
// // //import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import { DatePicker } from "@mui/x-date-pickers";
// // import { LocalizationProvider } from '@mui/x-date-pickers'
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// // import dayjs from 'dayjs'

// // const AddTask = ({ closeModal, teamMembers }) => {
// //   const [memberSearch, setMemberSearch] = useState("");
// //   const [ccMemberSearch, setCcMemberSearch] = useState("");
// //   const [selectedDate, setSelectedDate] = useState(dayjs());
// //   const validationSchema = Yup.object().shape({
// //     title: Yup.string().required("Title is required"),
// //     description: Yup.string().required("Description is required"),
// //     members: Yup.array().min(1, "At least one member is required"),
// //     ccMembers: Yup.array(),
// //     date: Yup.date()
// //     .required("Date is required")
// //     .min(new Date(), "Date must be in the future"),
// //   });
// //   const initialValues = {
// //     title: "",
// //     description: "",
// //     members: [],
// //     date: null,
// //     ccMembers: [],
// //     priority:""
// //   };

// //   const handleSubmit = (values) => {
// //     console.log('first')
// //    // console.log("Submitted values:", values);

// //     closeModal();
// //   };
// //   const filteredMembers = teamMembers.filter((member) =>
// //     member.Name.toLowerCase().includes(memberSearch.toLowerCase())
// //   );

// //   const filteredCcMembers = teamMembers.filter((member) =>
// //     member.Name.toLowerCase().includes(ccMemberSearch.toLowerCase())
// //   );
// //   const handleDateChange = (newDate) => {
// //     setSelectedDate(newDate);
// //   }

// //   return (
// //     <Modal open onClose={closeModal}>
// //       <Box
// //         sx={{
// //           position: "absolute",
// //           top: "50%",
// //           left: "50%",
// //           transform: "translate(-50%, -50%)",
// //           width: 500,
// //           bgcolor: "background.paper",
// //           boxShadow: 24,
// //           p: 4,
// //           borderRadius: "10px",
// //         }}
// //       >
// //         <Typography variant="h6" component="h2" gutterBottom>
// //           Add Task
// //         </Typography>

// //         <Formik
// //           initialValues={initialValues}
// //           validationSchema={validationSchema}
// //           onSubmit={handleSubmit}
// //         >
// //           {({
// //             values,
// //             handleChange,
// //             handleBlur,
// //             setFieldValue,
// //             errors,
// //             touched,
// //           }) => (
// //             <Form>
// //               <TextField
// //                 fullWidth
// //                 label="Title"
// //                 name="title"
// //                 value={values.title}
// //                 onChange={handleChange}
// //                 onBlur={handleBlur}
// //                 error={touched.title && Boolean(errors.title)}
// //                 helperText={touched.title && errors.title}
// //                 margin="normal"
// //               />

// //               <TextField
// //                 fullWidth
// //                 label="Description"
// //                 name="description"
// //                 value={values.description}
// //                 onChange={handleChange}
// //                 onBlur={handleBlur}
// //                 error={touched.description && Boolean(errors.description)}
// //                 helperText={touched.description && errors.description}
// //                 margin="normal"
// //                 multiline
// //                 rows={3}
// //               />
// //                 <LocalizationProvider dateAdapter={AdapterDayjs}>
// //                     <DatePicker
// //                       label="Select Date"
// //                       value={selectedDate}
// //                       onChange={handleDateChange}
// //                       renderInput={(params) => <TextField {...params} />}
// //                     />
// //                   </LocalizationProvider>

// //               <FormControl
// //                 fullWidth
// //                 margin="normal"
// //                 error={touched.members && Boolean(errors.members)}
// //               >
// //                 <InputLabel>Add Users</InputLabel>
// //                 <Select
// //                   multiple
// //                   name="members"
// //                   value={values.members}
// //                   onChange={(e) => setFieldValue("members", e.target.value)}
// //                   input={<OutlinedInput label="Add Users" />}
// //                   renderValue={(selected) =>
// //                     selected
// //                       .map(
// //                         (memberId) =>
// //                           teamMembers.find((m) => m.UserId === memberId)?.Name
// //                       )
// //                       .join(", ")
// //                   }
// //                   MenuProps={{
// //                     PaperProps: {
// //                       sx: {
// //                         maxHeight: 300, // Limit height of dropdown
// //                         overflow: "auto",
// //                       },
// //                     },
// //                   }}
// //                 >
// //                   <MenuItem>
// //                     <TextField
// //                       placeholder="Search members..."
// //                       size="small"
// //                       value={memberSearch}
// //                       onChange={(e) => setMemberSearch(e.target.value)}
// //                       fullWidth
// //                     />
// //                   </MenuItem>
// //                   <MenuItem disabled>
// //                     <ListItemText primary="Select Members" />
// //                   </MenuItem>

// //                   {filteredMembers.map((member) => (
// //                     <MenuItem key={member.UserId} value={member.UserId}>
// //                       <Checkbox
// //                         checked={values.members.includes(member.UserId)}
// //                       />
// //                       <ListItemText primary={member.Name} />
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //                 {touched.members && errors.members && (
// //                   <Typography variant="body2" color="error">
// //                     {errors.members}
// //                   </Typography>
// //                 )}
// //               </FormControl>

// //               <FormControl fullWidth margin="normal">
// //                 <InputLabel>Add CC Members</InputLabel>
// //                 <Select
// //                   multiple
// //                   name="ccMembers"
// //                   value={values.ccMembers}
// //                   onChange={(e) => setFieldValue("ccMembers", e.target.value)}
// //                   input={<OutlinedInput label="Add CC Members" />}
// //                   renderValue={(selected) =>
// //                     selected
// //                       .map(
// //                         (memberId) =>
// //                           teamMembers.find((m) => m.UserId === memberId)?.Name
// //                       )
// //                       .join(", ")
// //                   }
// //                   MenuProps={{
// //                     PaperProps: {
// //                       sx: {
// //                         maxHeight: 300, // Limit height of dropdown
// //                         overflow: "auto",
// //                       },
// //                     },
// //                   }}
// //                 >
// //                   <MenuItem>
// //                     <TextField
// //                       placeholder="Search CC members..."
// //                       size="small"
// //                       value={ccMemberSearch}
// //                       onChange={(e) => setCcMemberSearch(e.target.value)}
// //                       fullWidth
// //                     />
// //                   </MenuItem>

// //                   {/* Filtered List of CC Members */}
// //                   <MenuItem disabled>
// //                     <ListItemText primary="Select CC Members" />
// //                   </MenuItem>

// //                   {filteredCcMembers.map((member) => (
// //                     <MenuItem key={member.UserId} value={member.UserId}>
// //                       <Checkbox
// //                         checked={values.ccMembers.includes(member.UserId)}
// //                       />
// //                       <ListItemText primary={member.Name} />
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //               <FormControl fullWidth margin="normal">
// //                 <InputLabel>Priority</InputLabel>
// //                 <Select
// //                   name="priority"
// //                   value={values.priority}
// //                   onChange={handleChange}
// //                   input={<OutlinedInput label="Priority" />}
// //                 >
// //                   {priority.map((level, index) => (
// //                     <MenuItem key={index} value={level}>
// //                       {level}
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //               <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
// //                 <Button
// //                     type="submit"
// //                   onClick={closeModal}
// //                   variant="outlined"
// //                   color="secondary"
// //                 >
// //                   Cancel
// //                 </Button>
// //                 <Button type="submit" variant="contained" color="primary">
// //                   Add Task
// //                 </Button>
// //               </Box>
// //             </Form>
// //           )}
// //         </Formik>
// //       </Box>
// //     </Modal>
// //   );
// // };

// // export default AddTask;
// import React, { useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   OutlinedInput,
//   Checkbox,
//   ListItemText,
// } from "@mui/material";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { priority } from "../../utils/utils";
// //import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { DatePicker } from "@mui/x-date-pickers";
// import { LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import dayjs from 'dayjs'

// const AddTask = ({ closeModal, teamMembers }) => {
//     const [memberSearch, setMemberSearch] = useState("");
//     const [ccMemberSearch, setCcMemberSearch] = useState("");
//     const [selectedDate, setSelectedDate] = useState(dayjs());

//     const validationSchema = Yup.object().shape({
//       title: Yup.string().required("Title is required"),
//       description: Yup.string().required("Description is required"),
//       members: Yup.array().min(1, "At least one member is required"),
//       ccMembers: Yup.array(),
//       date: Yup.date()
//         .required("Date is required")
//         .min(new Date(), "Date must be in the future"),
//     });

//     const initialValues = {
//       title: "",
//       description: "",
//       members: [],
//       date: null,
//       ccMembers: [],
//       priority: "",
//     };

//     const handleSubmit = (values) => {
//       console.log("Submitted values:", values);
//       closeModal();
//     };

//     const filteredMembers = teamMembers.filter((member) =>
//       member.Name.toLowerCase().includes(memberSearch.toLowerCase())
//     );

//     const filteredCcMembers = teamMembers.filter((member) =>
//       member.Name.toLowerCase().includes(ccMemberSearch.toLowerCase())
//     );

//     const handleDateChange = (newDate) => {
//       setSelectedDate(newDate);
//     };

//     return (
//       <Modal open onClose={closeModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 500,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: "10px",
//           }}
//         >
//           <Typography variant="h6" component="h2" gutterBottom>
//             Add Task
//           </Typography>

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({
//               values,
//               handleChange,
//               handleBlur,
//               setFieldValue,
//               errors,
//               touched,
//             }) => (
//               <Form>
//                 <TextField
//                   fullWidth
//                   label="Title"
//                   name="title"
//                   value={values.title}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.title && Boolean(errors.title)}
//                   helperText={touched.title && errors.title}
//                   margin="normal"
//                 />

//                 <TextField
//                   fullWidth
//                   label="Description"
//                   name="description"
//                   value={values.description}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={touched.description && Boolean(errors.description)}
//                   helperText={touched.description && errors.description}
//                   margin="normal"
//                   multiline
//                   rows={3}
//                 />

//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker
//                     label="Select Date"
//                     value={selectedDate}
//                     onChange={handleDateChange}
//                     renderInput={(params) => <TextField {...params} />}
//                   />
//                 </LocalizationProvider>

//                 <FormControl
//                   fullWidth
//                   margin="normal"
//                   error={touched.members && Boolean(errors.members)}
//                 >
//                   <InputLabel>Add Users</InputLabel>
//                   <Select
//                     multiple
//                     name="members"
//                     value={values.members}
//                     onChange={(e) => setFieldValue("members", e.target.value)}
//                     input={<OutlinedInput label="Add Users" />}
//                     renderValue={(selected) =>
//                       selected
//                         .map(
//                           (memberId) =>
//                             teamMembers.find((m) => m.UserId === memberId)?.Name
//                         )
//                         .join(", ")
//                     }
//                     MenuProps={{
//                       PaperProps: {
//                         sx: {
//                           maxHeight: 300,
//                           overflow: "auto",
//                         },
//                       },
//                     }}
//                   >
//                     <MenuItem>
//                       <TextField
//                         placeholder="Search members..."
//                         size="small"
//                         value={memberSearch}
//                         onChange={(e) => setMemberSearch(e.target.value)}
//                         fullWidth
//                       />
//                     </MenuItem>
//                     <MenuItem disabled>
//                       <ListItemText primary="Select Members" />
//                     </MenuItem>

//                     {filteredMembers.map((member) => (
//                       <MenuItem key={member.UserId} value={member.UserId}>
//                         <Checkbox checked={values.members.includes(member.UserId)} />
//                         <ListItemText primary={member.Name} />
//                       </MenuItem>
//                     ))}
//                   </Select>
//                   {touched.members && errors.members && (
//                     <Typography variant="body2" color="error">
//                       {errors.members}
//                     </Typography>
//                   )}
//                 </FormControl>

//                 <FormControl fullWidth margin="normal">
//                   <InputLabel>Add CC Members</InputLabel>
//                   <Select
//                     multiple
//                     name="ccMembers"
//                     value={values.ccMembers}
//                     onChange={(e) => setFieldValue("ccMembers", e.target.value)}
//                     input={<OutlinedInput label="Add CC Members" />}
//                     renderValue={(selected) =>
//                       selected
//                         .map(
//                           (memberId) =>
//                             teamMembers.find((m) => m.UserId === memberId)?.Name
//                         )
//                         .join(", ")
//                     }
//                     MenuProps={{
//                       PaperProps: {
//                         sx: {
//                           maxHeight: 300,
//                           overflow: "auto",
//                         },
//                       },
//                     }}
//                   >
//                     <MenuItem>
//                       <TextField
//                         placeholder="Search CC members..."
//                         size="small"
//                         value={ccMemberSearch}
//                         onChange={(e) => setCcMemberSearch(e.target.value)}
//                         fullWidth
//                       />
//                     </MenuItem>

//                     <MenuItem disabled>
//                       <ListItemText primary="Select CC Members" />
//                     </MenuItem>

//                     {filteredCcMembers.map((member) => (
//                       <MenuItem key={member.UserId} value={member.UserId}>
//                         <Checkbox checked={values.ccMembers.includes(member.UserId)} />
//                         <ListItemText primary={member.Name} />
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 <FormControl fullWidth margin="normal">
//                   <InputLabel>Priority</InputLabel>
//                   <Select
//                     name="priority"
//                     value={values.priority}
//                     onChange={handleChange}
//                     input={<OutlinedInput label="Priority" />}
//                   >
//                     {priority.map((level, index) => (
//                       <MenuItem key={index} value={level}>
//                         {level}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
//                   <Button
//                     onClick={closeModal}
//                     variant="outlined"
//                     color="secondary"
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" variant="contained" color="primary">
//                     Add Task
//                   </Button>
//                 </Box>
//               </Form>
//             )}
//           </Formik>
//         </Box>
//       </Modal>
//     );
//   };

//   export default AddTask;
// import React, { useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Checkbox,
//   ListItemText,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// import { privatePost } from "../../services/privateRequest";
// import { ADDTASK } from "../../services/apiEndpoints";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// const AddTask = ({ closeModal, teamMembers }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [members, setMembers] = useState([]);
//   const [ccMembers, setCcMembers] = useState([]);
//   const [priority, setPriority] = useState("");
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [memberSearch, setMemberSearch] = useState("");
//   const [ccMemberSearch, setCcMemberSearch] = useState("");
//   const [attachedFile, setAttachedFile] = useState(null);
//   const handleSubmit = async () => {
//     // const values = {
//     //   title,
//     //   description,
//     //   members,
//     //   ccMembers,
//     //   date: selectedDate,
//     //   priority,
//     //   attachedFile,
//     // };
// const params = {
//   AssignedBy: 1248,
//   AssignedDate: "",
//   AssignedToUserId: "",
//   CompletedDate: "",
//   Description: description,
//   Id: "",
//   Image: "",
//   IntercomGroupIds: [],
//   IsActive: true,
//   Latitude: "",
//   LeadId: "",
//   Location: "",
//   Longitude: "",
//   MultimediaData: attachedFile || "",
//   MultimediaExtension: attachedFile
//     ? attachedFile.name.split(".").pop()
//     : "",
//   MultimediaFileName: attachedFile ? attachedFile.name : "",
//   MultimediaType: attachedFile ? attachedFile.type : "",
//   Priority: priority,
//   TaskDisplayOwners: "",
//   TaskEndDate: selectedDate
//     ? selectedDate.format("DD MMM YYYY hh:mm A")
//     : "",
//   TaskEndDateDisplay: selectedDate ? selectedDate.toISOString() : "",
//   TaskOwners: members,
//   TaskStatus: "",
//   Title: title,
//   UserDisplayIds: `${members.length} User${members.length > 1 ? "s" : ""}`,
//   UserIds: members,
// };
//     try{
//         const res = await privatePost(ADDTASK, params);
//         console.log("res", res);
//         toast.success("New task added successfully")
//         console.log("Submitted values:", params);
//         closeModal();
//     }
//     catch(err){
//         toast.error("Error in submitting form")
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setAttachedFile(file);
//   };

//   const filteredMembers = teamMembers.filter((member) =>
//     member.Name.toLowerCase().includes(memberSearch.toLowerCase())
//   );

//   const filteredCcMembers = teamMembers.filter((member) =>
//     member.Name.toLowerCase().includes(ccMemberSearch.toLowerCase())
//   );

//   return (
//     <Modal open onClose={closeModal}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 500,
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//           borderRadius: "10px",
//         }}
//       >
//         <Typography variant="h6" component="h2" gutterBottom>
//           Add Task
//         </Typography>

//         <TextField
//           fullWidth
//           label="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           margin="normal"
//         />

//         <TextField
//           fullWidth
//           label="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           margin="normal"
//           multiline
//           rows={3}
//         />

//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker
//             label="Select Date"
//             value={selectedDate}
//             onChange={setSelectedDate}
//             renderInput={(params) => <TextField {...params} />}
//           />
//         </LocalizationProvider>

// <FormControl fullWidth margin="normal">
//   <InputLabel>Add Users</InputLabel>
//   <Select
//     multiple
//     value={members}
//     onChange={(e) => setMembers(e.target.value)}
//     input={<OutlinedInput label="Add Users" />}
//     renderValue={(selected) =>
//       selected
//         .map(
//           (memberId) =>
//             teamMembers.find((m) => m.UserId === memberId)?.Name
//         )
//         .join(", ")
//     }
//   >
//     <MenuItem>
//       <TextField
//         placeholder="Search members..."
//         size="small"
//         value={memberSearch}
//         onChange={(e) => setMemberSearch(e.target.value)}
//         fullWidth
//       />
//     </MenuItem>
//     {filteredMembers.map((member) => (
//       <MenuItem key={member.UserId} value={member.UserId}>
//         <Checkbox checked={members.includes(member.UserId)} />
//         <ListItemText primary={member.Name} />
//       </MenuItem>
//     ))}
//   </Select>
// </FormControl>

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Add CC Members</InputLabel>
//           <Select
//             multiple
//             value={ccMembers}
//             onChange={(e) => setCcMembers(e.target.value)}
//             input={<OutlinedInput label="Add CC Members" />}
//             renderValue={(selected) =>
//               selected
//                 .map(
//                   (memberId) =>
//                     teamMembers.find((m) => m.UserId === memberId)?.Name
//                 )
//                 .join(", ")
//             }
//           >
//             <MenuItem>
//               <TextField
//                 placeholder="Search CC members..."
//                 size="small"
//                 value={ccMemberSearch}
//                 onChange={(e) => setCcMemberSearch(e.target.value)}
//                 fullWidth
//               />
//             </MenuItem>
//             {filteredCcMembers.map((member) => (
//               <MenuItem key={member.UserId} value={member.UserId}>
//                 <Checkbox checked={ccMembers.includes(member.UserId)} />
//                 <ListItemText primary={member.Name} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth margin="normal">
//           <InputLabel>Priority</InputLabel>
//           <Select
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//             input={<OutlinedInput label="Priority" />}
//           >
//             <MenuItem value="High">High</MenuItem>
//             <MenuItem value="Medium">Medium</MenuItem>
//             <MenuItem value="Low">Low</MenuItem>
//           </Select>
//         </FormControl>
//         <Box mt={2}>
//           <Typography variant="body1" gutterBottom>
//             Attach File
//           </Typography>
//           <input type="file" onChange={handleFileChange} />
//           {attachedFile && (
//             <Typography variant="body2" mt={1}>
//               Attached: {attachedFile.name}
//             </Typography>
//           )}
//         </Box>

//         <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
//           <Button onClick={closeModal} variant="outlined" color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             Add Task
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default AddTask;
