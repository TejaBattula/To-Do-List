import React, { useEffect, useState } from 'react'
import './ProgressBar.css'
const ProgressBar = ({task}) => {
  const completedtasks = task.filter((t)=>t.completed).length
  console.log(completedtasks);
  
  const totallength=task.length
  const percentage = totallength==0?0:(completedtasks/totallength)*100
  return (
    <div className='progressBar-page'>
      
      <div className='progressBar-title'>
        <p>ProgressTracker</p>
        <div>{completedtasks} of {totallength} completed</div>
      </div>
      <div className='progressBar-parent'>
        <div className='progressBar' style={{width:`${percentage}%`}}>

        </div>
      </div>
    </div>
  )
}

export default ProgressBar