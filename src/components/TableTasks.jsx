import React, { useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import '../css/components/tableTasks.css';
import Context from '../context/Context';
import api from '../api';

function TableTasks() {
  const { userData, tasks, setTasks, isSaving, setIsSaving } = useContext(Context);

  useEffect(() => {
    api.get('/tasks',
      { headers: { 'authorization': userData.data.token } })
      .then(res => setTasks(res.data));
  }, [ isSaving ]);

  const updateTask = async (id) => {
    setIsSaving(false);

    api.update(`/tasks/${ id }`, id)
      .then(res => res.data);

    setIsSaving(true);
  };

  const deleteTask = (idTask) => {
    setIsSaving(false);

    api.delete(`/tasks/${ idTask }`, idTask);

    setTimeout(() => {
      setIsSaving(true);
    }, 2000);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="item-table">Item</th>
            <th className="task-table">Tarefa</th>
            <th className="date-table">Data</th>
            <th className="status-table">Status</th>
            <th className="buttons-table"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td className="item-table">{index + 1}</td>
              <td className="task-table">{task.task}</td>
              <td className="date-table">{task.createdAt}</td>
              <td className="status-table">{task.status}</td>
              <td className="buttons-table">
                <Button
                  variant="outline-secondary"
                  type="button"
                  className="update-button"
                  onClick={(event) => updateTask(event)}
                >
                  Editar
                </Button>
                <Button
                  variant="outline-secondary"
                  type="button"
                  value={task._id}
                  className="delete-button"
                  onClick={(event) => deleteTask(event.target.value)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TableTasks;