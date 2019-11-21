import React from 'react';

const ToDoList = (props) => {
  return (
    <div>
      {
        props.toDos.map((toDo, index) => 
          (
            <div key={index}>{toDo.work}</div>
          )
        )
      }
    </div>
  )
};

export default ToDoList;
