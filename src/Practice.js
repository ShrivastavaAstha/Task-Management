import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Taskmangement = () => {
  const [task, settask] = useState([]);
  const [tasktitle, settasktitle] = useState("");
  const [taskdescription, settaskds] = useState("");
  const [taskduedate, setduedate] = useState(new Date());

  //to add task:
  const addtask = () => {
    if (tasktitle === "") return toast.warning("Please Provide Task Title");
    else if (taskdescription === "")
      return toast.warning("Please Provide Task Description");
    else if (!taskduedate) return toast.warning("Please Provide Due Date");
    let oldtask = [...task];
    let newtask = {
      TaskTitle: tasktitle,
      TaskDescription: taskdescription,
      TaskDueDate: taskduedate,
      TaskStatus: "To-do",
    };
    oldtask.push(newtask);
    settask(oldtask);
    toast.success("Task created successfully");
    settasktitle("");
    settaskds("");
    setduedate("");
  };
  //To delete task:
  const deletetask = (index) => {
    let oldtask = [...task];
    let newtask = oldtask.filter((v, i) => i !== index);
    settask(newtask);
  };
  //To update description:
  const updatedescription = (index, newds) => {
    let oldtask = [...task];
    oldtask[index].TaskDescription = newds;
    settask(oldtask);
  };

  //To update taskStatus:
  const handlestatus = (index, status) => {
    const oldtask = [...task];
    if (status === "To-do") {
      oldtask[index].TaskStatus = "On-going";
    } else if (status === "On-going") {
      oldtask[index].TaskStatus = "Completed";
    } else if (status === "Completed") {
      oldtask[index].TaskStatus = "To-do";
    }
    settask(oldtask);
  };

  const getbuttonName = (status) => {
    const oldtask = [...task];
    if (status === "To-do") return "START TASK";
    else if (status === "On-going") return "COMPLETED";
    else if (status === "Completed") return "RESTART";
    settask(oldtask);
  };

  const getcolor = (status) => {
    const oldtask = [...task];
    if (status === "To-do") return "red";
    else if (status === "On-going") return "Green";
    else if (status === "Completed") return "Yellow";
    settask(oldtask);
  };

  return (
    <>
      <ToastContainer />
      <h1>TaskManagement App:</h1>

      <label>Task Title: </label>
      <input
        value={tasktitle}
        onChange={(e) => settasktitle(e.target.value)}
        type="text"
        placeholder="Enter title"
      />
      <br />
      <br />
      <label>Task Description:</label>
      <textarea
        value={taskdescription}
        onChange={(e) => settaskds(e.target.value)}
        type="text"
        placeholder="Enter description"
      />
      <br />
      <label>Task DueDate: </label>
      <input
        value={taskduedate}
        onChange={(e) => setduedate(e.target.value)}
        type="date"
      />
      <br />
      <br />
      <button onClick={() => addtask()}> Add Task</button>
      {task.map((v, i) => {
        return (
          <div key={i} style={{ backgroundColor: getcolor(v.TaskStatus) }}>
            <ul>
              <li> Task Title: {v.TaskTitle}</li>
              Task Description: {v.TaskDescription}
              <br />
              Task DueDate: {v.TaskDueDate}
              <br />
              Task Status: {v.TaskStatus}
              <br />
              <button onClick={() => deletetask(i)}>Delete</button>
              <button
                onClick={() =>
                  updatedescription(i, <textarea>{v.TaskDescription}</textarea>)
                }
              >
                Update Me
              </button>
              <button
                onClick={() => handlestatus(i, v.TaskStatus)}
                type="button"
              >
                {getbuttonName(v.TaskStatus)}
              </button>
            </ul>
          </div>
        );
      })}
    </>
  );
};
export default Taskmangement;
