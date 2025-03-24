import React, { useEffect, useState, useRef } from "react";
import Modal from "../../shared/modal/Modal";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../shared/formik/FormikControl";
import dayjs from "dayjs";
import { privatePost } from "../../services/privateRequest";
import { ADDTASK } from "../../services/apiEndpoints";
import toast from "react-hot-toast";
import { priorities, UserId } from "../../utils/utils";
import styles from "./AddTask.module.css";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addTask } from "../../slices/myTaskSlice";

const AddTask = ({ closeModal, teamMembers }) => {
  const fileInputRef = useRef(null);
  const [fileObj, setFileObj] = useState([]);
  const dispatch=useDispatch()
  const SignupSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
    members: Yup.array().required("This Field is Required"),
    date: Yup.string().required("this field is required"),
  });
  const userId = UserId();
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
      if(file){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]); // Extract only Base64
        reader.onerror = (error) => reject(error);
      }     
    });
  };
  const handleFileDelete = () => {
    setFileObj([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSubmit = async (values) => {
    let base64File = "";
    if (fileObj.name) {
      base64File = await convertFileToBase64(fileObj);
    }

    const formattedDate = dayjs(values.date).format("DD MMM YYYY hh:mm A");
    const ccMembersObj = values.ccMember
      ? values.ccMembers.map((option) => ({
          UserId: option.value,
          Name: option.label,
        }))
      : "";

    const params = {
      AssignedBy: userId ? userId[0] : 1248,
      AssignedDate: "",
      AssignedToUserId: "",
      CompletedDate: "",
      Description: values.description,
      Id: "",
      Image: base64File ? base64File : "",
      IntercomGroupIds: [],
      IsActive: true,
      Latitude: "",
      LeadId: "",
      Location: "",
      Longitude: "",
      MultimediaData: base64File || "",
      MultimediaExtension: fileObj.name ? fileObj.name.split(".").pop() : "",
      MultimediaFileName: fileObj.name ? fileObj.name.split(".")[0] : "",
      MultimediaType: "D",
      Priority: values.priority ? values.priority[0] : "",
      TaskDisplayOwners: values.ccMember
        ? `${values.ccMembers.length} User${
            values.ccMembers.length > 1 ? "s" : ""
          }`
        : "",
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
   await dispatch(addTask(params));
    // const res = await privatePost(ADDTASK, params);
    // toast.success("New task added successfully");
    closeModal();
    //console.log("Submitted values:", params);
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
                    <div style={{ display: "flex", flexDirection: "column" }}>
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
                          UserId: member.UserId,
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
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFileObj(file);
                        }}
                        className={styles.fileAttach}
                        ref={fileInputRef}
                      />
                      {fileObj.name && (
                        <Delete
                          style={{ cursor: "pointer", marginLeft: "8px" }}
                          onClick={handleFileDelete}
                        />
                      )}
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
