import React, { useEffect, useState } from 'react'
import './login.css'
const Login = ({displayLogin,createAccount,sendEmail}) => {
  const [islogin,setLogin]=useState(false)
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const [loginStatus,setLoginStatus]=useState("")
  const [signupStatus,setSignupStatus]=useState("false")
  const [loading,setLoading]=useState(false)
  const undoLogin = ()=>{
    displayLogin()
  }
  const handleLoginData = async (e)=>{
    e.preventDefault()
   
    console.log({email : email,password : password});
    setLoading(true)
    const response=await fetch("https://to-do-list-52u2.onrender.com/login",{
      method : 'POST',
      headers:{'content-Type':'application/json'},
      body : JSON.stringify({email : email,password : password}),
      
    })
    const data =await response.json()
    if(data.status==200){
      console.log(data.message);
      setLoginStatus("true")
      createAccount()
      console.log("login email",email);
      
      sendEmail(email)
      
    }else{
      console.log(data.message);
      setLoginStatus("false")

    }
    setLogin(false)
  }
  const handleSignupData=async (e)=>{
    e.preventDefault()
    
    console.log({email : email,password : password});
    
    const response=await fetch("https://to-do-list-52u2.onrender.com/signup",{
      method : 'POST',
      headers:{'content-Type':'application/json'},
      body : JSON.stringify({email : email,password : password}),
      
    })
    const data =await response.json()
    if(data.status==200){
      console.log(data.message);
      setSignupStatus("true")
      createAccount()
      
      sendEmail(email)
    }
    else if(data.message =="email existed!"){
      console.log(data.message);
      setSignupStatus("email existed!")
    }
    else{
      console.log(data.message);

    }
  }
  useEffect(()=>{
    if(loginStatus=="true"){
      undoLogin() 
    }
  },[loginStatus])
  useEffect(()=>{
    if(signupStatus=="true"){
      undoLogin()
    }
  },[signupStatus])
  return (
    <div className='Login'>
        {
          islogin==true?<div className='login-page-parent'>
            <div className='login-page'>
                  <div className='login-title'>
                    <h1>Login</h1>
                    <p>Clad to see you again 👋</p>
                  </div>
                  <form onSubmit={(e)=>{handleLoginData(e)}}>

                    <div>
                      <label htmlFor="email">Email</label>
                      <input onChange={(e)=>{setemail(e.target.value)}} name='email' type="email" placeholder='📧 Enter you email' />
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <input onChange={(e)=>{setpassword(e.target.value)}} type="password" name="password" placeholder='🔒........' />
                    </div>
                    {loginStatus=="false"?<p style={{color:"red",fontSize:"12px"}}>Please enter valid password or email</p>:""}

                    <button>Login<div class="spinner"></div></button>
                  </form>
                  <p className='sign-up-switch'>Don't have an account?<span onClick={()=>{setLogin(!islogin)}} style={{color:"rgb(86, 41, 211)",cursor:"pointer"}}>Sign up</span></p>
                  <i onClick={undoLogin} class="fa-regular fa-circle-xmark"></i>
        </div>
          </div>
        :<div className='login-page-parent'>
          <div className='login-page' >
            <div className='login-title'>
              <h1>Sign-up</h1>
              <p>Welcome to the Task Manager 👋</p>
            </div>
            <form onSubmit={(e)=>{handleSignupData(e)}}>
              <div>
                <label htmlFor="email">Email</label>
                <input onChange={(e)=>{setemail(e.target.value)}} type="email" placeholder='📧 Enter you email' required />
                {signupStatus=="email existed!"?<p style={{color:"red",fontSize:"12px"}}>Email existed already!</p>:""}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input onChange={(e)=>{setpassword(e.target.value)}} type="password" name="password" placeholder='🔒........' required />
              </div>
              <button>Sign Up<div class="spinner"></div></button>
            </form>
            <p className='sign-up-switch'>Already have an account?<span onClick={()=>{setLogin(!islogin)}} style={{color:"rgb(86, 41, 211)",cursor:"pointer"}}>Login</span></p>
            <i onClick={undoLogin} class="fa-regular fa-circle-xmark"></i>

    </div>
        </div>
        }
      
    </div>
  )
}

export default Login