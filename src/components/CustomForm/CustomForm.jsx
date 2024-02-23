// import React, { useState } from "react";

// const CustomForm = () => {
//   const [modalForm, setModalForm] = useState({
//     mainTitle: "",
//     taskType: "",
//     tasks: [
//       {
//         description: {},
//         subtasks: [],
//       },
//     ],
//   });
//   //   const [mainTaskIndex, setMainTaskIndex] = useState(0)
//   let mainTaskIndex = 0;
//   const [openMainTask, setOpenMainTask] = useState(false);
//   const [openModal, setOpenModal] = useState(false);

//   const handleMainTaskForm = () => {
//     setOpenModal(false);
//     setOpenMainTask(true);
//   };
//   const modalOpenHandler = () => {
//     setOpenModal(true)
//   }

//   //   const [modalData, setModalData] = useState({});
//   //   console.log(modalData);
//   return (
//     <div>
//       <div>
//         <h1>Task Manager</h1>
//         <button onClick={modalOpenHandler}>Add Task</button>
//       </div>
//       {openModal ? (
//         <div>
//           <form action="">
//             <input
//               type="text"
//               id="mainTitle"
//               placeholder="Enter title"
//               onChange={(e) =>
//                 setModalForm({ ...modalForm, mainTitle: e.target.value })
//               }
//             />
//             <select
//               name="taskType"
//               id="taskType"
//               onChange={(e) =>
//                 setModalForm({ ...modalForm, taskType: e.target.value })
//               }
//             >
//               <option value="Task">Task</option>
//               <option value="Grouped Task">Grouped Task</option>
//             </select>
//             <button onClick={handleMainTaskForm}>Save</button>
//           </form>
//         </div>
//       ) : null}

//       {openMainTask ? (
//         <div>
//           <form action="">
//             {/* <div>
//               <button>x</button>
//             </div> */}
//             <h2>{modalForm.mainTitle}</h2>
//             <input
//               type="text"
//               id="mainDescription"
//               placeholder="Enter a description"
              
//             />
//           </form>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default CustomForm;


import React from 'react';
import { useFormik } from 'formik';

const AddTasks = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      tasks: []
    },
    onSubmit: values => {

    },
  });

  const addTasks = (type) => {
    let tasksArr = [...formik.values.tasks];
    if (type == "single") {
      tasksArr.push({ type: "single", value: "" })
    } else {
      tasksArr.push({ type: "mutiple", value: [] })
    }
    formik.setFieldValue('tasks', tasksArr)
  }

  const addSubTasks = (index) => {
    let tasksArr = [...formik.values.tasks];
    tasksArr[index].value.push({ value: "" });
    // console.log(tasksArr)
    formik.setFieldValue('tasks', tasksArr)
    // console.log("tasksArr", index)
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      {
        formik.values.tasks.map((task, index) => {
          if (task.type == "single") {
            return (
              <>
                <input
                  name={`tasks[${index}].value`}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values?.tasks?.[index]?.value}
                /><br />
              </>
            )
          } else {
            return (
              <>
                {
                  // console.log(formik.values?.tasks?.[index]?.value)
                  formik.values?.tasks?.[index]?.value?.map((task, subIndex) => {
                    return (
                      <>
                        <input
                          name={`tasks[${index}].value[${subIndex}].value`}
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values?.tasks?.[index]?.value[subIndex].value}
                        />
                        <br/>
                      </>
                    )
                  })
                }
                < button type='button' onClick={() => addSubTasks(index)}>Add sub tasks</button >
                <br />
              </>
            )
          }
        })

      }
      <button type='button' onClick={() => addTasks('single')}>Add single</button>
      <button type='button' onClick={() => addTasks('multiple')}>Add multiple</button>
      {/* <button type="submit">Submit</button> */}
    </form >
  );
};

export default AddTasks;
