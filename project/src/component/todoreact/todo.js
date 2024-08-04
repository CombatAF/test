import React, { useEffect, useState } from "react";
import "./style.css";
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if(lists) {
    return JSON.parse(lists)
  }else {
    return [];
  }
}

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItems , setisEditItems] = useState("");
  const [togglebtn , settogglebtn] = useState(false);
// add items 
  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    }else if (inputdata && togglebtn ){
      setItems(
        items.map((currElem) =>   {
          if(currElem.id === isEditItems){
            return{...currElem , name : inputdata}
          }
return currElem;
        })
      )
      setInputData("")
      setisEditItems(null)
      settogglebtn(false)
       } else {
      const myNewInputData = {
        id : new Date().getTime().toString(),
        name : inputdata , 
      }
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // edit items 

  const editItem = (index) =>{
    const item_todo_edited = items.find((currElem) => {
      return currElem.id === index;

    })
    setInputData(item_todo_edited.name)
    setisEditItems(index)
    settogglebtn(true)
  }
// delete items 
const deleteItem = (index) => {
  const updatedItem = items.filter((currElem) => {
    return currElem.id !== index
  }
  )
  setItems(updatedItem);

}
// remove all elemets 
const removeAll = () =>{
  setItems([]);
}

// adding local storage 
useEffect(() => {
  localStorage.setItem("mytodolist" , JSON.stringify(items))
},[items]

)
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add your list here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {togglebtn ?  <i className="fa fa-edit  add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i> }
         
          </div>
          {/* show our items  */}
        
          <div className="showItems">
            {items.map((currElem, index) => {
              return (
                <div className="eachItem" key={currElem.index}>
                  <h3>{currElem.name}</h3>
                  <div className="todo-btn">
                    <i className="fa fa-edit add-btn" onClick={() => editItem(currElem.id)}></i>
                    <i className="fa fa-trash-alt add-btn" onClick={() => deleteItem(currElem.id)}></i>
                  </div>
                </div>
              );
            })}
            <button className="btn effect04" data-sm-link-text="Remove All"
            onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
