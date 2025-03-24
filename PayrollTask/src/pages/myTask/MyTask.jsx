import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyTask,setFilterApplied } from "../../slices/myTaskSlice";
import DataTable from "react-data-table-component";
import { fetchTeamMembers,UserId } from "../../utils/utils.jsx";
import ReactPaginate from "react-paginate";
import AddTask from "./AddTask";
import FilterTask from "./FilterTask.jsx";
import { Button, Tooltip } from "@mui/material";
import { Archive, Delete, CheckCircleOutline } from "@mui/icons-material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PercentIcon from "@mui/icons-material/Percent";
import ArchiveModal from "../../shared/modal/ArchiveModal.jsx";
import { privateGet, privatePost } from "../../services/privateRequest.js";
import { ACCEPT_TASK, ARCHIVE_TASK, DELETE_TASK,UPDATE_TASK } from "../../services/apiEndpoints.js";
import TaskCoverageModal from "../../shared/modal/TaskCoverageModal.jsx";
import DeleteModal from "../../shared/modal/DeleteModal.jsx";
import CompleteTaskModal from "../../shared/modal/CompleteModal.jsx";
import { toast } from "react-hot-toast";
import styles from "./Mytask.module.css"
import classes from"../../Pagination.module.css"

const MyTask = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [addTask, setAddtask] = useState(false);
  const[filterTask,setFilterTask]=useState(false)
  const [teamMembers, setTeamMembers] = useState([]);
  const userId=UserId()
 // console.log('UserId', userId)
  const taskParams = {
    From: currentPage * itemsPerPage + 1,
    FromDueDate: "",
    IsArchive: false,
    Priority: "",
    SortByDueDate: "",
    SortColumn: "",
    SortOrder: "",
    TaskStatus: "",
    Title: debouncedSearch,
    To: (currentPage + 1) * itemsPerPage,
    ToDueDate: "",
    UserId: userId,
    UserIds: "",
  };
  const [archive, setArchive] = useState(false);
  const [archiveId, setArchiveId] = useState();
  const[taskCoverage,setTaskCoverage]=useState(false)
  const[deleteTask,setDeleteTask]=useState(false)
  const[deleteId,setDeleteId]=useState()
  const[updateTask,setUpdateTask]=useState(false)
  const[updateValue,setUpdateValue]=useState({})
  //Archive
  const handleArchiveClick = (row) => {
    setArchive(true);
    setArchiveId(row.TaskId);
  };
  const handleArchiveSubmit = async () => {
    const res = await privatePost(ARCHIVE_TASK, {
      IsArchive: true,
      TaskId: +archiveId,
    });
    setArchive(false);
  };
  //Mark a task as completed
  const handleCompletTask = async (row) => {
    try{
      const res = await privatePost(ACCEPT_TASK, {
      TaskId: row.TaskId,
      TaskStatusValue: 0,
    });
    toast.success(res.data.data.Message||"Task accepted")
    console.log("first", row);
    console.log("triggered");
    }catch(error){
      console.log('error', error)
    }   
  };
  //View task coverage
  const handleTaskCoverage=()=>{
    setTaskCoverage(!taskCoverage)
  }
  //Delete a task
  const handleDeleteClick=(row)=>{
    setDeleteTask(true);
    setDeleteId(row.TaskId);
  }
  const handleDeleteSubmit=async()=>{
      const res=await privateGet(`${DELETE_TASK}?taskId=${deleteId}`)
      toast.success("Task deleted successfully")
      setDeleteTask(false)
  }
  //Update a task
  const handleUpdateClick=(row)=>{
    setUpdateTask(true)
    setUpdateValue(row)
    console.log('row', row)

  }

  const handleUpdateTaskSubmit = async () => {
    const res = await privatePost(UPDATE_TASK, {
      TaskId: updateValue.TaskId,
      TaskStatusValue:updateValue.TaskStatus
    });
    toast.success("Task Status Updated")
    setUpdateTask(false);
  };
  const getTaskColumns = () => [
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
            <Button onClick={() => handleArchiveClick(row)}>
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
            <Button onClick={() => handleCompletTask(row)}>
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
            <Button onClick={()=>handleTaskCoverage()}>
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
            <Button onClick={()=>handleDeleteClick(row)}>
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
            <Button onClick={()=>handleUpdateClick(row)}>
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
            <Button onClick={() => handlePercentage(row)}>
              <PercentIcon />
            </Button>
          </Tooltip>
        ) : (
          "-"
        ),
    },
  ];

  // const { task, totalCount,lastParams } = useSelector((state) => state.myTask);
  // console.log('lastParams', lastParams)
  const { task, totalCount, loading, lastParams, filterApplied } = useSelector(
    (state) => state.myTask
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleAddTask = () => {
    setAddtask(!addTask);
  };
 
  const closeModal = () => {
    setAddtask(false);
  };
  const handleFilterTask=()=>{
    setFilterTask(!filterTask)
  }
  const closeFilterTask=()=>{
    setFilterTask(false)
  }
  const getMembers = async () => {
    const members = await fetchTeamMembers(1, 10); // Fetch members from 1 to 10
    setTeamMembers(members);
  };
  useEffect(() => {
    getMembers();
  }, [addTask]);
  const handleClearFilters = () => {
    dispatch(fetchMyTask({ ...lastParams, UserIds: "", TaskStatus: "", Priority: "",FromDueDate:"",ToDueDate:"" }));
    dispatch(setFilterApplied(false)); 
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyTask(taskParams));
  }, [dispatch, itemsPerPage, currentPage, debouncedSearch]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
  };
  return (
    <>
      {addTask && <AddTask closeModal={closeModal} teamMembers={teamMembers} />}
      {filterTask&&<FilterTask closeModal={closeFilterTask} teamMembers={teamMembers} />}
      
      <ArchiveModal
        open={archive}
        handleClose={() => setArchive(false)}
        handleSubmit={handleArchiveSubmit}
      />
      <TaskCoverageModal
      open={taskCoverage}
      handleClose={()=>setTaskCoverage(false)}
      />
      <DeleteModal
        open={deleteTask}
        handleClose={() => setDeleteTask(false)}
        handleSubmit={handleDeleteSubmit}
      />
      <CompleteTaskModal
        open={updateTask}
        handleClose={() => setUpdateTask(false)}
        handleSubmit={handleUpdateTaskSubmit}
      />
      <div className={styles.inputButton}>
      <button className={styles.addButton} onClick={handleAddTask}>Add Task</button>
      <button className={styles.addButton} onClick={handleFilterTask}>Filter</button>
     {filterApplied&&<button className={styles.addButton} onClick={handleClearFilters}>Cancel Filter</button>}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchBtn}
        placeholder="search"
      />
      </div>
      <DataTable columns={getTaskColumns()} data={task} />
      <div className={styles.paginationDiv}>
        <div className="pagination-controls">
          <label htmlFor="itemsPerPage">Items per page: </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={Math.ceil(totalCount / itemsPerPage)}
            onPageChange={handlePageChange}
            containerClassName={classes.pagination}
            activeClassName={classes.active}
            breakLabel={"..."}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
          />
        </div>
      </div>
    </>
  );
};

export default MyTask;
