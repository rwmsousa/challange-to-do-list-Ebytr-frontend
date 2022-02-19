import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [ userData, setUserData ] = useState({});
  const [ tasks, setTasks ] = useState([]);
  const [ newTask, setNewTask ] = useState('');
  const [ isSaving, setIsSaving ] = useState(true);
  const [ showModalEditTask, setShowModalEditTask ] = useState(false);
  const [ taskInEdition, setTaskInEdition ] = useState({});
  const [ modalEdit, setModalEdit ] = useState(false);


  const providerValue = {
    userData,
    setUserData,
    tasks,
    setTasks,
    newTask,
    setNewTask,
    isSaving,
    setIsSaving,
    showModalEditTask,
    setShowModalEditTask,
    taskInEdition,
    setTaskInEdition,
    modalEdit,
    setModalEdit,
  };

  return (
    <Context.Provider value={providerValue}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.node ]).isRequired,
};

export default Provider;
