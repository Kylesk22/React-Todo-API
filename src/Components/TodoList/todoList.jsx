import React, { useState } from "react";
import "./todoList.css";

const TodoList = (props) => {
    const [todo, setTodo] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if (todo !== "") {
        props.setInput(todo);
        console.log(todo);
        setTodo("");}
        
    }


    return(
    <>
    <form className="container" onSubmit={onSubmit}>
        <input type="text" className="form-control" placeholder="What needs to be done?" aria-label="Todo" aria-describedby="button-addon2" value = {todo} onChange={(e) => {setTodo(e.target.value); console.log(todo)}}/>

    </form>
    </>
    )
}

export default TodoList;