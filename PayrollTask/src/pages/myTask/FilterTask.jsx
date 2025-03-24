import React, { useEffect, useState } from "react";
import Modal from "../../shared/modal/Modal";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../shared/formik/FormikControl";
import dayjs from "dayjs";
import { privatePost } from "../../services/privateRequest";
import { ADDTASK } from "../../services/apiEndpoints";
import toast from "react-hot-toast";
import { priorities, status } from "../../utils/utils";
import styles from "./AddTask.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyTask, setFilterApplied } from "../../slices/myTaskSlice";
const FilterTask = ({ closeModal, teamMembers }) => {
  const dispatch=useDispatch()
  const initialValues = {
    status: "",
    priority: "",
    members: "",
    fromDate: "",
    toDate: "",
  };
  const { task, totalCount, loading, lastParams, filterApplied } = useSelector(
    (state) => state.myTask
  );

  const handleCloseFun = () => {
    closeModal();
  };
  const handleSubmit = async (values) => {
    const formattedFromDate = dayjs(values.fromDate).format("MM/DD/YYYY");
    const formattedToDate = dayjs(values.toDate).format("MM/DD/YYYY");

    const newParams = {
      UserIds: values.members,
      TaskStatus: values.status ? values.status[0] : "",
      Priority: values.priority ? values.priority[0] : "",
      FromDueDate: formattedFromDate?formattedFromDate:"",
      ToDueDate: formattedToDate?formattedToDate:"",
    };
    
    const updatedParams = {
      ...lastParams,
      ...newParams,
    };
    // console.log('lastParams', lastParams)
    // console.log('updatedParams', updatedParams)
    // console.log('newParams', newParams)
    dispatch(fetchMyTask(updatedParams))
    dispatch(setFilterApplied(true));
    closeModal();
    // try {
    //   const res = await privatePost(ADDTASK, params);
    //   console.log("res", res);
    //   toast.success("New task added successfully");
    //   console.log("Submitted values:", params);
    //   closeModal();
    // } catch (err) {
    //   toast.error("Error in submitting form");
    // }
    
  };
  return (
    <Modal header={"Filter Task"} closeModal={closeModal}>
      <div>
        <Formik
          initialValues={initialValues}
          //validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            //console.log("formik.values", formik.values);
            return (
              <Form>
                <div>
                  <div className={styles.row}>
                    <FormikControl
                      control="select"
                      label="Select Status"
                      name="status"
                      options={status.map((option) => ({
                        value: option.value,
                        label: option.label,
                      }))}
                      isMulti={false}
                    />
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
                    />
                    <FormikControl
                      control="datePicker"
                      label="From due date"
                      name="fromDate"
                    />
                  </div>

                  <div className={styles.row}>
                    <FormikControl
                      control="datePicker"
                      label="To due date"
                      name="toDate"
                    />
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
  );
};

export default FilterTask;
