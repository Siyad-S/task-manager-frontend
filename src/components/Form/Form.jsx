import React, { useState } from "react";
import { useFormik } from "formik";
import "./Form.css";
import axios from "axios";

const Form = () => {
  const [openModal, setOpenModal] = useState(false);

  const postForm = (taskData) => {
    const response = axios.post("http://localhost:4000/tasks", {
      tasks: taskData.tasks,
      pin: 0,
    });
    return response.data;
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      tasks: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleTasks = (data) => {
    let tasksArray = [...formik.values.tasks];
    if (data.type === "single") {
      tasksArray.push({ tasks: "" });
    } else {
      tasksArray.push({ tasks: [] });
    }
    formik.setFieldValue("tasks", tasksArray);
  };

  const addSubtask = (index) => {
    let taskArray = [...formik.values.tasks];
    taskArray[index].tasks.push({ task: "" });
    formik.setFieldValue("tasks", taskArray);
  };

  const removeSubtask = (taskIndex, subtaskIndex) => {
    let taskArray = [...formik.values.tasks];
    subtaskIndex > 0 && taskArray[taskIndex].tasks.splice(subtaskIndex, 1);
    formik.setFieldValue("tasks", taskArray);
  };

  console.log(formik.values);

  const handleModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <h2 style={{textAlign: "center"}}>Task Manager</h2>
        </div>
        <button onClick={handleModal}>Add Task</button>
      </div>
      {openModal ? (
        <div id="myModal"> 
          <h2>Add new task block</h2>
          <span onClick={closeModal} className="close">&times;</span>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="title"
              id="blockTitle"
              className="task-input"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Enter title"
            />
            <select
              name="type"
              id="blockType" className="task-input"
              onChange={formik.handleChange}
              value={formik.values.type}
            >
              <option value=""></option>
              <option value="single">Task</option>
              <option value="multiple">Grouped Task</option>
            </select>
            <button
              type="button"
              id="saveBtn"
              onClick={() => handleTasks(formik.values)}
              className="save-button"
            >
              Save
            </button>
          </form>
        </div>
      ) : null}
      {formik.values.tasks.map((task, index) => (
        <form key={index} onSubmit={formik.handleSubmit}>
          {task.type === "single" ? (
            <div className="single-task" key={index}>
              <h2>{task.title}</h2>
              <input
                type="text"
                name={`tasks[${index}].task`}
                onChange={formik.handleChange}
                value={formik.values.tasks[index].task}
              />
            </div>
          ) : (
            <div className="grouped-task" key={index}>
              <h2>{task.title}</h2>
              {task.tasks.map((subTask, subIndex) => (
                <div className="subtask" key={subIndex}>
                  <input
                    type="text"
                    name={`tasks[${index}].tasks[${subIndex}].task`}
                    onChange={formik.handleChange}
                    value={formik.values.tasks[index].tasks[subIndex].task}
                  />
                  <button
                    type="button"
                    onClick={() => removeSubtask(index, subIndex)}
                  >
                    -
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addSubtask(index)}
                className="add-subtask-button"
              >
                +
              </button>
            </div>
          )}
        </form>
      ))}
      <div>
        <button onClick={() => postForm(formik.values)}>Save</button>
      </div>
    </div>
  );
};

export default Form;
