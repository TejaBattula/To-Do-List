import React, { act, useState } from 'react'
import './taskList.css'
const Tasklist = ({addList,addTask,updateTask,deleteTask,editableList,completedcount}) => {
    
    const [editValue,seteditValue]=useState("")
    const [filter,setfilter]=useState("all")
    const [activeState,setactive]=useState("all")
    const filteredList = addList.filter((task)=>{
        if(filter == "completed"){
            return task.completed
        }
        if(filter == "pending"){
            return !task.completed
        }
        return true
    })
    const toggleComplete = (id)=>{
        console.log("toogke",id);
        
        const updatedList = {...addList[id],completed:!addList[id].completed}
        updateTask(updatedList,id)
        
    }
    const handleEdit = (id)=>{
        const editList = {...addList[id],edit:!addList[id].edit}
        editableList(editList,id)
    }
    const handleEditChange = (value,id)=>{
        seteditValue(value)
        const editmsg = {...addList[id],text : value}
        editableList(editmsg,id)
    }
   
  return (
    <div className='taskListpage'>
        <div className='taskList-btns'>
            <button className={activeState=="all"?'all-btn active':"all-btn"} onClick={()=>{setfilter("all")
                 setactive("all")}}>All</button>
            <button className={activeState=="completed"?"completed-btn active":'completed-btn'} onClick={()=>{setfilter("completed")
                setactive("completed")
            }}>Completed</button>
            <button className={activeState=="pending"?"pending-btn active":'pending-btn'} onClick={()=>{setfilter("pending")
                setactive("pending")
            }}>Pending</button>
        </div>
        {
            filteredList.length>0?filteredList.map((obj,id)=>{
                const{text,priority,category,completed,edit}=obj
                
                return <div key={id} className='taskList'>
                    
                    <div>
                        <div className="taskName">{edit?<div>
                            <input className='saved-input'  value={editValue?editValue:text} onChange={(e)=>{handleEditChange(e.target.value,id)}}></input>
                        </div>:text}</div>
                        <div style={{fontSize:"10px",opacity:"0.7"}}>
                            (<span className="taskPriorities">{priority}</span>,
                                <span className="taskCategory">{category}</span>)
                        </div>
                    </div>
                    <div className='task-btns'>
                        <button onClick={()=>{handleEdit(id)}} className={edit?"save-btn":"edit-btn"}>{edit?"Save":"Edit"}</button>
                        <button className='complete-btn' onClick={()=>{toggleComplete(id)}}>{completed ?"Undo":"Complete"}</button>
                        <button className='delete-btn' onClick={()=>{deleteTask(id)}}>Delete</button>
                    </div>

            </div>
            }):<h3 style={{marginTop:"20px"}}>No Tasks Listed Yet</h3>
        }
    </div>
  )
}

export default Tasklist