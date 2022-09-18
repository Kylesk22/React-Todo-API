import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './Components/TodoList/todoList';
import './bootstrap.min (2).css'


function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [closeButton, setCloseButton] = useState(null);

  useEffect(() => {
    setList([...list, input])
  }, [input])

  function removeItem(index) {
    console.log(index);
    list.splice(index,1);
    setCloseButton(false);
    

  }
  function alertText() {
    let liLength = list.length - 1;
    if (liLength !== 0) {
      return `${liLength} items remaining`
    }
    else return `No tasks, add a task.`
  }

  return (
    <div className="App">
      <h1>TODOS</h1>
      <TodoList setInput={setInput} input={input}/>
      
        <ul>
          {list.map((val, index) => {
            if (val !== "") {
            return (
                <li key={index} id = {index} onMouseOver={(e) => {setCloseButton(index)}} onMouseOut={()=>setCloseButton(false)}>
                  {(closeButton === index)? <button className="btn btn-danger" style={{float: 'right'}} onClick= {()=>removeItem(index)}>X</button>: null}
                  {val}
                  </li>
            )
}})}
            <li className="remaining">{alertText()} </li>
            <li className="extra1"></li>
            <li className="extra2"></li>

        </ul>
      
    </div>
  );
}

export default App;
