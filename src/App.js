import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import TodoList from './Components/TodoList/todoList';
import './bootstrap.min (2).css'
import axios from 'axios';


function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [closeButton, setCloseButton] = useState(null);
  const [info, setInfo] = useState(["Example: Clothes"]);

  const getData = () => {
    console.log("request ran");
    axios
    .get('http://assets.breatheco.de/apis/fake/todos/user/KylesK')
    .then(response => {
      setInfo(response.data);
      let savedInputs = []; 
      console.log(`data: ${response.data}`);
      for (let i = 0; i < response.data.length; i++) {
        
        savedInputs.push(response.data[i].label);
      
      }
        //setInput(savedInputs.map((v)=>{return v}));
        console.log("si" + savedInputs);
        console.log("li" + list)

        
      
    
  })
    .catch((error) => console.log(error))
  }

  const postData = () => {
    console.log("post ran");
    axios
    .post('http://assets.breatheco.de/apis/fake/todos/user/KylesK/', list)
    .then(response => console.log(response))
    .catch((error) => console.log(error))

  }


  const putData = () => {
    console.log("put ran");
    console.log(info);
    axios
    .put('http://assets.breatheco.de/apis/fake/todos/user/KylesK', info)
    .then(response => console.log(response))
    .catch((error) => console.log(error))

  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("triggered");
    putData();

    
  }, [info]) 
  
 
  useEffect(() => {
    //getData();
    console.log(`input: ${input}`)
    if (input !== "") {
      setInfo([...info, {label: input, done: false}]);
 

    }
    

    
    setList([...list, input]);
    console.log("info" + info );
    console.log(JSON.stringify(info));
    console.log("list" + list)
  }, [input])

  function removeAll() {
    setInfo([]);
    info.splice(0, info.length);
    console.log("NewInfo" + info);
    putData();
  }

  function removeItem(index, val) {
    console.log(index);
    info.splice(index,1);
    setCloseButton(false);

    putData();
    

  }
  function alertText() {
    let liLength = info.length;
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
          {info.map((val, index) => {
            console.log("val" + val)
            if (val !== "") {
            return (
                <li key={index} id = {index} onMouseOver={(e) => {setCloseButton(index)}} onMouseOut={()=>setCloseButton(false)}>
                  {(closeButton === index)? <button className="btn btn-danger" style={{float: 'right'}} onClick= {()=>removeItem(index, val)}>X</button>: null}
                  {val["label"]}
                  </li>
            )
}})}
            <li className="remaining">{alertText()} </li>
            <li className="extra1"></li>
            <li className="extra2"></li>

        </ul>
        <button className="btn btn-danger" onClick={() => removeAll()}>Remove All Tasks</button>
      
    </div>
  );
}

export default App;
