import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/features/todoSlice";
import TaskList from "../TaskList/TaskList";

// css file import
import "../css/Style.css";

const Main = () => {
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("Low");

  //create event handlers
  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskPriorityChange = (e) => {
    setTaskPriority(e.target.value);
  };

  const dispatch = useDispatch();

  // handleSubmit for submitting form data
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      name: taskName,
      priority: taskPriority,
    };

    dispatch(addTodo(newTask));

    // data setting method to local storage

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updatedTasks = [...existingTasks, newTask];

    // save the updated data to local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // reset the form after data submission
    setTaskName("");
    setTaskPriority("Low");

    // success toast notification
    toast.success("Task added successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <section className="vh-100">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container py-5 h-100">
        <div className="row md:d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div
              className="card"
              id="list1"
              style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
            >
              <div className="card-body py-4 px-4 px-md-5">
                <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                  <i className="fas fa-check-square me-1"></i>
                  <u>My Todos</u>
                </p>
                <Form
                  handleTaskNameChange={handleTaskNameChange}
                  handleSubmit={handleSubmit}
                  handleTaskPriorityChange={handleTaskPriorityChange}
                  taskName={taskName}
                  taskPriority={taskPriority}
                />
                <TaskList handleSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
