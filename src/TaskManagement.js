import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
<link
  href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=DynaPuff&display=swap"
  rel="stylesheet"
  m
/>;

const Taskmanagement = () => {
  const [task, settask] = useState([]);
  const [taskTitle, settasktitle] = useState("");
  const [taskdescription, settaskds] = useState("");
  const [taskduedate, setduedate] = useState(new Date());

  //to get all the tasks
  const gettask = async () => {
    const response = await axios.get("/api/gettask");
    if (response.data.success) {
      settask(response.data.task);
    } else {
      toast.success("Something went wrong");
    }
  };

  //To add task:
  const addtask = async () => {
    if (taskTitle.trim() === "")
      return toast.warning("Please Provide Task Title");
    else if (taskdescription.trim() === "")
      return toast.warning("Please Provide Task Description");
    else if (!taskduedate) return toast.warning("Please Provide Due Date");
    // let pretask = [...task];
    // let newtask = {
    //   taskTitle,
    //   taskdescription,
    //   taskduedate,
    //   TaskStatus: "To-do",
    // };
    // pretask.push(newtask);
    // settask(pretask);
    gettask();
    settasktitle("");
    settaskds("");
    setduedate("");

    const response = await axios.post("/api/addtask", {
      taskTitle,
      taskdescription,
      taskduedate,
      TaskStatus: "To-do",
    });
    console.log(response);
    if (response.data.success) {
      toast.success("Task stored successfully");
    } else toast.error("Something Went Wrong!");
  };

  // //To delete task:
  // const deletetask = (index) => {
  //   let pretask = [...task];
  //   let newtask = pretask.filter((v, i) => i !== index);
  //   settask(newtask);
  // };

  //to delete task:
  const deletetask = async (id) => {
    const response = await axios.delete(`/api/deletetask/${id}`);
    if (response.data.success) {
      gettask();
      toast.success("Task deleted successfully");
    } else {
      toast.warning("Something went wrong");
    }
  };

  //To update task description:
  // const updatedescription = (currentIndex, newDescription) => {
  // const pretask = [...task];
  // pretask[currentIndex].taskdescription = newDescription;
  // settask(pretask);
  // };

  const updatedescription = async (id, newDescription) => {
    const response = await axios.post(`/api/updatedescription/${id}`, {
      taskdescription: newDescription,
    });
    if (response.data.success) {
      gettask();
      toast.success("Task Updated Successfully.");
    } else {
      toast.error("Something went wrong");
    }
  };

  //To update task date:
  const updatedate = (currentIndex, newDate) => {
    const pretask = [...task];
    pretask[currentIndex].taskduedate = newDate;
    settask(pretask);
  };

  //To update status of task:
  const handlestatus = async (id, status) => {
    let newstatus;
    if (status === "To-do") {
      newstatus = "On-going";
    } else if (status === "On-going") {
      newstatus = "Completed";
    } else if (status === "Completed") {
      newstatus = "To-do";
    }
    const response = await axios.post(`/api/handlestatus/${id}`, {
      TaskStatus: newstatus,
    });
    if (response.data.success) {
      gettask();
      toast.success("Task Updated Successfully.");
    } else {
      toast.error("Something went wrong");
    }
  };

  const getbuttonName = (status) => {
    if (status === "To-do") return "START TASK";
    else if (status === "On-going") return "COMPLETED";
    else if (status === "Completed") return "RESTART";
  };

  const getColor = (status) => {
    if (status === "To-do") return "red";
    else if (status === "On-going") return "yellow";
    else if (status === "Completed") return "lightgreen";
  };

  //useEffect function:
  //useEffect(fatarrowfunction,[])
  useEffect(() => {
    gettask(); //this function will run at very first time when page will reload.
  }, []);
  return (
    <>
      <ToastContainer />
      <h1>Task Management App:</h1>
      <label>TaskTitle: </label>
      <input
        value={taskTitle}
        onChange={(e) => settasktitle(e.target.value)}
        type="text"
        placeholder="Enter Task Title"
      />
      <br />
      <br />
      <label>Task Description: </label>
      <textarea
        value={taskdescription}
        onChange={(e) => settaskds(e.target.value)}
        type="text"
        placeholder="Enter Task Description"
      ></textarea>
      <br />
      <br />
      <label>Task Due Date:</label>
      <input
        value={taskduedate}
        onChange={(e) => setduedate(e.target.value)}
        type="date"
      />
      <br />
      <br />
      <button onClick={() => addtask()}>Add Task</button>
      {/* <button onClick={() => gettask()}>Get task</button> */}
      {task.map((v, i) => {
        return (
          <div key={i}>
            <ul>
              <div
                className="Notes"
                style={{ backgroundColor: getColor(v.TaskStatus) }}
              >
                <li
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    textAlign: "center",
                  }}
                >
                  Task Title: {v.taskTitle}
                </li>
                <br />
                Task Description: {v.taskdescription}
                <br />
                <br />
                Task Due Date: {v.taskduedate}
                <br />
                <br />
                Task Status: {v.TaskStatus}
                <br />
                <br />
                {/* <button onClick={() => deletetask(i)} type="button">
                  Delete
                </button> */}
                <br />
                <button
                  onClick={() =>
                    updatedescription(
                      v._id,
                      <textarea>{v.taskdescription}</textarea>
                    )
                  }
                  type="button"
                >
                  Update Description
                </button>
                <button
                  onClick={() => updatedate(i, <input type="date" />)}
                  type="button"
                >
                  Update Due Date
                </button>
                <button
                  onClick={() => handlestatus(v._id, v.TaskStatus)}
                  type="button"
                >
                  {getbuttonName(v.TaskStatus)}
                </button>
                <button onClick={() => deletetask(v._id)}>Delete task</button>
              </div>
            </ul>
          </div>
        );
      })}
    </>
  );
};
export default Taskmanagement;
