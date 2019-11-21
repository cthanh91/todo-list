import React, { useState } from 'react';

const AddToDo = (props) => {
  const [toDo, setToDo] = useState('');
  const onSubmit = async () => {
    if (await props.onSubmit(toDo)) {
      setToDo('');
    };
  };
  return (
    <div>
      <input type="text" value={toDo} onChange={(e) => setToDo(e.target.value)} />
      <button onClick={onSubmit}>Add</button>
    </div>
  )
};

export default AddToDo;
