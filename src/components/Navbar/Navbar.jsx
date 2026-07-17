import React,{useState} from 'react'
import './Navbar.css'
const Navbar = ({addTask,totalTasks,showMenuBar,accountLogin,isaccountcreated,createAccount,Addemail}) => {
  const [taskValue,settaskValue]=useState("")
    const [selectedPriValue,setselectedPriValue]=useState("Low")

    const [selectedCatgValue,setselectedCatgValue]=useState("General")
    const [id,setId]=useState(0)
    const handleSlidebar = ()=>{

        showMenuBar()
    }
    
    const handleChange = (value)=>{
        
        
        settaskValue(value)
    }
    
    const handlePriority=(e)=>{
        setselectedPriValue(e.target.value)
    }
    const handleCategory=(e)=>{
        setselectedCatgValue(e.target.value)
    }
    const handleSubmit = ()=>{
      console.log("hi",Addemail);
      
      if(isaccountcreated){
        addTask({
            text:taskValue,
            priority:selectedPriValue,
            category:selectedCatgValue,
            completed : false,
            edit : false,
        })
        setId(previd=>previd+1)
        settaskValue("")
        setselectedCatgValue("General")
        setselectedPriValue("Low")}
        else{
          alert("Please login to your account!")
        }
    }
    const handleLogin = ()=>{
      accountLogin()
    }
    const nav_percentage = totalTasks.length==0?0:(totalTasks.filter((t)=>t.completed).length/totalTasks.length)*100
  return (
    <div className='Navbar-section'>
      <div className="navbar-top">
        <div className='navbar-title'>
          <i class="fa-solid fa-bars" onClick={handleSlidebar}></i>
          My To-Do List</div>
        <div className="add-List">
            <div className='add-new-task'>
            <input value={taskValue} onChange={(e)=>{handleChange(e.target.value)}} type="text" placeholder='Add New Task..' />
            <i onClick={handleSubmit} class="fa-solid fa-plus"></i>
            </div>
          
            <div className="taskInfo">
                <select value={selectedPriValue} onChange={(e)=>{handlePriority(e)}}>
                    <option value="Low">Low</option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>

                </select>
                <select value={selectedCatgValue} onChange={(e)=>{handleCategory(e)}}>
                    <option value="General">General</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>

                </select>
            </div>
            <div>
              <i onClick={isaccountcreated?"":handleLogin} style={{textAlign:"center"}} class="fa-solid fa-circle-user"><p style={{fontSize:"15px",cursor:"pointer"}} onClick={()=>{createAccount()}}>{isaccountcreated?"Log Out":""}</p></i>
            </div>

        </div>
      </div>
      <div className="nav-body">
        <div className="list-info-card">
          <div className="list-info-card-left1">
          <i class="fa-solid fa-clipboard-list"></i>
          </div>
          <div className='list-info-card-right'>
            <p>Total Tasks</p>
            <h2>{totalTasks.length}</h2>
            <p>All tasks</p>
          </div>
        </div>
        <div className="list-info-card">
          <div className="list-info-card-left2">
          <i class="fa-regular fa-circle-check"></i>
          </div>
          <div className='list-info-card-right'>
            <p>Completed</p>
            <h2>{totalTasks.filter((t)=>t.completed).length}</h2>
            <p>{nav_percentage.toFixed(2)}% completed</p>
          </div>
        </div>
        <div className="list-info-card">
          <div className="list-info-card-left3">
          <i class="fa-regular fa-clock"></i>
          </div>
          <div className='list-info-card-right'>
            <p>Pending</p>
            <h2>{totalTasks.filter((t)=>!t.completed).length}</h2>
            <p>{totalTasks.length==0?0:100-nav_percentage.toFixed(2)}% remaining</p>
          </div>
        </div>
        <div className="list-info-card">
          <div className="list-info-card-left4">
          <i class="fa-solid fa-arrow-trend-up"></i>
          </div>
          <div className='list-info-card-right'>
            <p>Productivity</p>
            <h2>{nav_percentage.toFixed(0)}%</h2>
            <p>Great job</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar