/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
const Form = ({
  handleSubmit,
  taskName,
  handleTaskNameChange,
  taskPriority,
  handleTaskPriorityChange,
}) => {
  return (
    <>
      <div className="px-5 bg-white py-4">
        <form
          className="d-flex flex-md-row flex-column justify-content-evenly gap-md-0 gap-3"
          onSubmit={handleSubmit}
        >
          <div className="col-auto">
            <label htmlFor="inputPassword5" className="form-label">
              Task Name
            </label>
            <input
              required
              type="text"
              className="form-control form-control-lg"
              id="exampleFormControlInput1"
              placeholder="Task Name"
              value={taskName}
              onChange={handleTaskNameChange}
            />
          </div>
          <div className="col-auto">
            <label htmlFor="inputPassword5" className="form-label">
              Task Priority
            </label>
            <select
              required
              className="form-select form-select-lg"
              aria-label="Default select example"
              value={taskPriority}
              onChange={handleTaskPriorityChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="col-auto d-flex justify-content-center align-items-end">
            <button className="btn btn-primary btn-lg" type="submit">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
