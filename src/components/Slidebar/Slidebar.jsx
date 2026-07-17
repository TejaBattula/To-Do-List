import React from 'react'
import './Slidebar.css'
const Slidebar = ({showMenuBar}) => {
    const handleSlidebarDisplay = ()=>{

        showMenuBar()
        
    }
  return (
    <div className='Slidebar'>
        <div className='task-List'>
            
                <div className='task-title'>
                    <i class="fa-solid fa-square-check"></i>
                    <h1>TaskFlow</h1>
                    <i class="fa-solid fa-xmark" onClick={handleSlidebarDisplay}></i>
                </div>
                <p >Stay organized,get things done.</p>
            
        </div>
        
        <div className="taskList-info">
            <div className='task-card all-tasks'>
                <div className='task-left'>
                    <i class="fa-regular fa-rectangle-list"></i>
                    <p>All Tasks</p>
                </div>
            </div>
            
            <div className='task-card'>
                <div className='task-left'>
                    <i class="fa-regular fa-circle-check"></i>                    
                    <p>Today</p>
                </div>
            </div>
            <div className='task-card'>
                <div className='task-left'>
                    <i class="fa-regular fa-rectangle-list"></i>
                    <p>Completed</p>
                </div>
            </div>
            
        </div>
        <div className="taskList-categories">
            <p>Categories</p>
            <div className='category-list'>
                <div className='category-card'>
                    <div className='category-title'>
                        <div style={{width:"13px",height:"13px",borderRadius:"50%",backgroundColor:"blue"}}></div>
                        <span>Work</span>
                    </div>
                </div>
                <div className='category-card'>
                    <div className='category-title'>
                        <div style={{width:"13px",height:"13px",borderRadius:"50%",backgroundColor:"green"}}></div>
                        <span>Study</span>
                    </div>
                </div>
                <div className='category-card'>
                    <div className='category-title'>
                        <div style={{width:"13px",height:"13px",borderRadius:"50%",backgroundColor:"orange"}}></div>
                        <span>Personal</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Slidebar