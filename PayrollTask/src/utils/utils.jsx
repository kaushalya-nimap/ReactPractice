import { privateGet } from "../services/privateRequest";
import { COMPANY_MEMBERS } from "../services/apiEndpoints";
import { Button, Tooltip } from "@mui/material";
import {
  Archive,
  Delete,
  CheckCircle,
  ThumbUp,
  CheckCircleOutline,
} from "@mui/icons-material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PercentIcon from "@mui/icons-material/Percent";
import { useState } from "react";

export const getToken = () => {
  return localStorage.getItem("token");
};
export const UserId=()=>{
  const userId= localStorage.getItem("UserId")
  return userId ? [JSON.parse(userId)] : [];
}
const handlePercentage=(row)=>{
  console.log('row', row)
}


export const getTaskColumns = () => [
  {
    name: "Title",
    selector: (row) => row.Title,
    sortable: true,
  },
  {
    name: "Customer Name",
    selector: (row) => row.LeadName,
    sortable: true,
  },
  {
    name: "Assigned By",
    selector: (row) => row.AssignedByUserName,
    sortable: true,
  },
  {
    name: "Assigned Date",
    selector: (row) =>
      row.CreateDate ? new Date(row.CreateDate).toLocaleDateString() : "-",
    sortable: true,
  },
  {
    name: "Due Date",
    selector: (row) =>
      row.TaskEndDate ? new Date(row.TaskEndDate).toLocaleDateString() : "-",
    sortable: true,
  },
  {
    name: "Priority",
    selector: (row) => row.Priority,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.TaskStatus,
    sortable: true,
  },
  {
    name: "Archive",
    selector: (row) =>
      row.TaskStatus !== 100 ? (
        <Tooltip title="Archive Task">
          <Button>
            <Archive />
          </Button>
        </Tooltip>
      ) : (
        "-"
      ),
  },
  {
    name: "Accept",
    selector: (row) =>
      row.TaskStatus === -1 ? (
        <Tooltip title="Accept Task">
        <Button>
          <CheckCircleOutline />
        </Button>
        </Tooltip>
      ) : (
        "-"
      ),
  },
  {
    name: "Task Coverage",
    selector: (row) =>
      row.TaskId ? (
        <Tooltip title="View Task Coverage">
        <Button>
          <SignalCellularAltIcon />
        </Button>
        </Tooltip>
      ) : (
        "-"
      ),
  },
  {
    name: "Delete",
    selector: (row) =>
      row.TaskId ? (
        <Tooltip title="Delete Task">
        <Button>
          <Delete />
        </Button>
        </Tooltip>
      ) : (
        "-"
      ),
  },
  {
    name: "Complete",
    selector: (row) =>
      row.TaskStatus !== 100 && row.TaskStatus !== -1 ? (
        <Tooltip title="Mark Task as Completed">
        <Button>
          <CheckCircleOutline />
        </Button>
        </Tooltip>
      ) : (
        "-"
      ),
  },
  {
    name: "Task Percentage",
    selector: (row) =>
      row.TaskStatus !== 100 && row.TaskStatus !== -1 ? (
        <Tooltip title="Task Percentage">
        <Button onClick={()=>handlePercentage(row)}>
          <PercentIcon />
        </Button>
        </Tooltip>
      ) : (
        "-"
      ),
  },
];

const paramsTeamMember = {
  from: 1,
  text: "",
  to: -1,
};
export const fetchTeamMembers = async (from = 1, to = 10) => {
  const res = await privateGet(`${COMPANY_MEMBERS}?from=${from}&to=${to}`);
  return res.data.data.Members;
};

export const priorities = [
  { label: "High Priority", value: "High" },
  { label: "Low Priority", value: "Low" },
];
export const status=[
  { label: "Accepted", value: "Accepted" },
  { label: "Not Accepted", value: "Not Accepted" },
  { label: "Partial Completed", value: "Partial Completed" },
  { label: "Completed", value: "Completed" },
]

