import React from "react";
import Task from "./components/Task";
import Item from "./components/Item";
import Todo from "./components/Todo";
function App() {
  return (
    <div className='container p-3' style={{ userSelect: 'none'}}>
      <Todo/>
    </div>
  );
}

export default App;
