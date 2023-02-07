import React, { useEffect, useState } from 'react';
import List from './List';
import Alert from './Alert';
import {XCircle} from 'react-bootstrap-icons';
const getLocalStorage=()=>{
  let list=localStorage.getItem('list');
  if(list) return JSON.parse(list)
  else return [];
}
function App() {
  const [name,setName]=useState("");
  const [list,setList]=useState(getLocalStorage());
  const [isEditing,setIsEdinting]=useState(false); 
  const [editId,setEditId]=useState(null);
  const [alert,setAlert]=useState({show:false,msg:"",type:""});
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Submitted");
    if(!name){
      setAlert({show:true,msg:"Please Enter the Value",type:"warning"})
      let timeOut=setTimeout(setAlert,4000,{show:false,msg:"",type:""})
    }
    else if(name && isEditing){
      let temp=[];
      for(let i of list){
        if(i.id==editId){
          temp.push({...i,title:name})
        }
        else temp.push(i);
      }
      setList(temp)
      setName("");
      setEditId(null);
      setIsEdinting(false)
      setAlert({show:true,msg:"Item Edited",type:"success"})
      let timeOut=setTimeout(setAlert,3000,{show:false,msg:"",type:""})
    }
    else{
      const newItem={id:new Date().getTime().toString(),
      title:name};
      setList([...list,newItem]);
      setName("")
      setAlert({show:true,msg:"Item Inserted",type:"success"})
      let timeOut=setTimeout(setAlert,2000,{show:false,msg:"",type:""})
    }
  }
  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])
  const clearList=()=>{
    setList([])
    setAlert({show:true,msg:"List Cleared",type:"dark"})
    let timeOut=setTimeout(setAlert,3000,{show:false,msg:"",type:""})
  }
  const removeItem=(id)=>{
    setList(list.filter((item)=>item.id!==id))
    setAlert({show:true,msg:"Item Removed",type:"success"})
    let timeOut=setTimeout(setAlert,3000,{show:false,msg:"",type:""})
  }
  const editItem=(id)=>{
    let item;
    list.forEach(element => {
      if(element.id==id){
        item=element
      }
    });
    setIsEdinting(true);
    setEditId(id);
    setName(item.title);
  }
  return (
    <>
    <h1> Grocery List </h1>
    <div className="card shadow-lg p-3 mb-5 bg-white rounded"> 
    {alert.show && <Alert {...alert}/>}
      <form className='input' onSubmit={handleSubmit}>
        <input type={"text"} className='form-control' placeholder='e.g. bread' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
        <button type="submit" className="btn btn-primary">{isEditing?"Edit":"Add"}</button>
      </form>
      {list.length>0 && (<div className='list text-center'>
      <List items={list} removeItem={removeItem} editItem={editItem}/>
      <button className='btn btn-danger' onClick={clearList}><XCircle/> Clear Items</button>
      </div>)}
      
    </div>
    </>

  );
}

export default App;
