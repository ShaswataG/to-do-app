import React from "react"
import { useTasks } from "../App"

const Task = (props) => {
    const { tasks, handleSubmit, handleDeleteTask, handleStatusChange } = useTasks()
    return (
        <div className="task-item" id={props.id}>
            <h3 style={props.status === "active" ? {textDecoration: "none"} : {textDecoration: "line-through"}}>{props.title}</h3>
            <button id={props.id} onClick={handleStatusChange}>{props.status === "active" ? "Active" : "Completed"}</button>
            <button id={props.id} onClick={handleDeleteTask}>Delete</button>
        </div>
    )
}

export default Task