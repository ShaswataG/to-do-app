import React from "react"
import Task from './components/Task'
import Form from './components/Form'
import { useState, createContext, useContext } from "react";
import uniqid from 'uniqid';

const UserContext = createContext();

const App = () => {
  const [addingTask, setAddingTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [taskItems, setTaskItems] = useState([]);
  const [category, setCategory] = useState("all")

  const addTask = (event) => {
    
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewTask(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (newTask.trim.length > 0) {
      const temp = {
        id: uniqid(),
        title: newTask,
        status: "active"
      }
      setTasks(prevTasks =>  {
        return [
          temp,
          ...prevTasks
        ]})
        setNewTask("")
    // }
  }
  
  const handleAddTask = () => {
    setAddingTask(true)
  }

  const handleStatusChange = (event) => {
    setTasks(prevTasks => {
      return tasks.map(task => {
        if (event.target.id === task.id)
          return {
            ...task,
            status: task.status === "active" ? "completed" : "active"
          }
        else
          return task
      })
    })
  }

  const handleDeleteTask = async (event) => {
    const { id } = event.target
    console.log("Test")
    console.log(id)
    setTasks(prevTasks => {
      const temp =  tasks.filter(task => {
                return (id != task.id)
      })
      return temp
    })
  } 
  
  const handleFilter = (event) => {
    const { name, value } = event.target
    setCategory(value)
  }

  React.useEffect(() => {
    console.log("hello")
    console.log(tasks)
    setTaskItems(prevTaskItems => {
      return tasks.filter(task => {
        if (category === "all")
          return true
        else
          return category === task.status
      }).map((task) => {
        return (
          <Task key={task.id} id={task.id} title={task.title} status={task.status} />
        )
      })
    })
  }, [tasks, category])

  return (
    <UserContext.Provider value={{ tasks, handleSubmit, handleChange,setAddingTask, setNewTask, handleStatusChange, handleDeleteTask }}>
      <main className="main-container">
        <h1>To-Do App</h1>
        <div className="buttons-container">
          <button onClick={handleAddTask}>Add New Task</button>
          <select name="viewStatus" onChange={handleFilter}>
            <option value="all">All tasks</option>
            <option value="active">Active tasks</option>
            <option value="completed">Completed tasks</option>
          </select>
        </div>
        {addingTask && <Form />}
        <div className="tasks-container">
          {taskItems.length > 0 ? taskItems : <h1 style={{textAlign: "center"}}>No Tasks Available</h1>}
        </div>
      </main>
    </UserContext.Provider>
  )
}

export default App
export const useTasks = () => {
  return useContext(UserContext)
}