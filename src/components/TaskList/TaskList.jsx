/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const TaskList = ({ handleSubmit }) => {
  //Create state variable to store tasks
  const [tasks, setTasks] = useState([]);

  //Use useEffect to fetch tasks from local storage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, [handleSubmit]);

  const handleDelete = (index) => {
    toast.warn("The task is deleted", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    // Remove the task from the tasks array
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    // Save the updated tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <section className="vh-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-12 col-xl-10">
            <div className="card mask-custom">
              <div className="card-body p-4 text-white">
                <div className="text-center pt-2 pb-2">
                  <h2 className="my-3 text-white">Task List</h2>
                  <h5 className="text-white">Total Tasks: {tasks.length}</h5>
                </div>

                <div className="table-responsive">
                  <table className="table text-white mb-0">
                    <thead className="">
                      <tr>
                        <th scope="col">Completed</th>
                        <th scope="col">Task</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSortedTasks().map((task, index) => (
                        <tr className="fw-normal" key={index}>
                          <td className="align-middle">
                            <div className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                              <div className="form-check">
                                <input
                                  className="form-check-input me-0"
                                  type="checkbox"
                                  aria-label="..."
                                  checked={task.completed}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">
                            {editingIndex === index ? (
                              <input
                                type="text"
                                className="form-control"
                                value={task.name}
                                onChange={(e) => {
                                  const updatedTasks = tasks.map((t, i) =>
                                    i === index
                                      ? { ...t, name: e.target.value }
                                      : t
                                  );
                                  setTasks(updatedTasks);
                                }}
                              />
                            ) : (
                              <span>{task.name}</span>
                            )}
                          </td>
                          <td className="align-middle">
                            {editingIndex === index ? (
                              <select
                                className="form-select"
                                value={task.priority}
                                onChange={(e) => {
                                  const updatedTasks = tasks.map((t, i) =>
                                    i === index
                                      ? { ...t, priority: e.target.value }
                                      : t
                                  );
                                  setTasks(updatedTasks);
                                }}
                              >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                              </select>
                            ) : (
                              <h6 className="mb-0">
                                <span
                                  className={`badge ${
                                    (task.priority === "High" && "bg-danger") ||
                                    (task.priority === "Medium" &&
                                      "bg-warning") ||
                                    (task.priority === "Low" && "bg-success")
                                  }`}
                                >
                                  {task.priority}
                                </span>
                              </h6>
                            )}
                          </td>
                          <td className="align-middle">
                            {editingIndex === index ? (
                              <span
                                className="text-success me-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleSave(index)}
                              >
                                Save
                              </span>
                            ) : (
                              <span
                                className="text-info me-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEdit(index)}
                              >
                                <MdEdit size="20" />
                              </span>
                            )}
                            <span
                              className="text-warning"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDelete(index)}
                            >
                              <RiDeleteBin6Line size="20" />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskList;
