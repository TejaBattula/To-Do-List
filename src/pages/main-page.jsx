import React,{useState,useEffect} from 'react'
import './main-page.css'
import Slidebar from '../components/Slidebar/Slidebar'
import Navbar from '../components/Navbar/Navbar'
import ProgressBar from '../components/ProgressBar/ProgressBar'
import Tasklist from '../components/TaskCard/taskList'
import Login from './login'
const MainPage = () => {
  const [completedTaskCount,setcompletedTaskCount]=useState(0)
  const [isdisplayLogin,setisdisplayLogin]=useState(false)
  const [isaccountcreated,setaccountCreated]=useState(false)
  const [email,setemail]=useState("")
  // useEffect(()=>{
  //   localStorage.setItem("tasks",JSON.stringify(tasks))
  // })

  const [tasks,setTasks]=useState([])
  const [isshowMenu,setMenu]=useState(false)

  const addTask = async (task)=>{
    
    setTasks([...tasks,task])
    try {
      const response = await fetch("https://to-do-list-52u2.onrender.com/tasks",{
        method : 'POST',
        headers:{'content-Type':'application/json'},
        body : JSON.stringify(task)
      })
      const data = await response.json()
      console.log(data.message);
      
    } catch (error) {
      console.log(error.message);
      
    }
  }
  const handleMenubar = ()=>{

    setMenu(!isshowMenu)
  }
  const deleteTask = (id)=>{
    const newList = tasks.filter((obj,index)=>{
      return id !=index
    })
    setTasks(newList)
    
  }
  const updateTask = (updatedList,index)=>{
    const newTask = [...tasks]
    newTask[index]=updatedList
    setTasks(newTask)
    
    
  }
  const editableList=(edit,id)=>{
    
    const editedList = [...tasks]
    editedList[id]=edit
    setTasks(editedList)
    
  }
  const accountFun = ()=>{
    setisdisplayLogin(!isdisplayLogin)
  }
  const createAccount=()=>{
    setaccountCreated(!isaccountcreated)
    
  }
  
  return (
    <div className='main-page'>
        <div className='body-section'>
        <div className={isshowMenu?"left-section left-section-none":"left-section" }>
            <Slidebar showMenuBar={handleMenubar}/>
        </div>
        <div className="right-section">
            <div className="right-top-section">        
              <Navbar addTask={addTask} totalTasks={tasks} showMenuBar={handleMenubar} accountLogin={accountFun}  isaccountcreated={isaccountcreated} createAccount={createAccount} Addemail={email}/>
            </div>
            <div className="right-middle-section">
            <ProgressBar task={tasks} 
            completedtasks={completedTaskCount}/>
            </div>
            <div className="right-bottom-section">
              <Tasklist addList={tasks}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              editableList={editableList}
              completedcount={setcompletedTaskCount}/></div>
        </div>
        </div>
        
        <div className='login-box'>
          {isdisplayLogin==true?<Login displayLogin={accountFun} createAccount={createAccount} sendEmail={setemail}/>:""}
        </div>
    </div>
  )
}

export default MainPage