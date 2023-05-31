export const initialCreateProject = (
  _prjName,
  _prjTasks = [],
  _prjId = crypto.randomUUID()
) => {
  // let fakeName = "Fake Name";

  const getPrjName = () => {
    return _prjName;
  };

  const addTask = (task) => {
    _prjTasks.push(task);
  };

  const getPrjId = () => {
    return _prjId;
  };

  const getPrjTasks = () => {
    return _prjTasks;
  };

  const getPrjProps = () => {
    return {
      _prjName,
      _prjTasks,
      _prjId,
    };
  };

  return {
    getPrjName,
    getPrjTasks,
    addTask,
    getPrjId,
    getPrjProps,
    _prjName,
    _prjId,
    _prjTasks,
  };
};

// export const initialCreateProject = ( _prjName) => {
//   let fakeName = "Fake Name";
//   let _prjTasks = [];
//   let _prjId = crypto.randomUUID();

//   const getPrjName = () => {
//     return _prjName;
//   };

//   const addTask = (task) => {
//     _prjTasks.push(task);
//   };

//   const getPrjId = () => {
//     return _prjId;
//   };

//   const getPrjTasks = () => {
//     return _prjTasks;
//   };

//   const getPrjProps = () => {
//     return {
//       _prjName,
//       _prjTasks,
//       _prjId,
//     };
//   };

//   return {
//     getPrjName,
//     getPrjTasks,
//     addTask,
//     getPrjId,
//     getPrjProps,
//     fakeName,
//   };
// };
