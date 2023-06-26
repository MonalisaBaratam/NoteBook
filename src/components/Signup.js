import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/alert/AlertContext'
function Signup() {
  const context = useContext(AlertContext)
  const {showAlert} = context
  let navigate = useNavigate()
  const [credentials,setCredentials] = useState({
    name:"",
    email:"",
    password:"",
    cpassword:""
}) 
const onChange =(event)=>{
  setCredentials({...credentials,[event.target.name]:event.target.value})
}
  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(credentials);
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
      });
    //   console.log("came");
      const json = await response.json();
      console.log(json);
      if(json.success){
        localStorage.setItem('token',json.authtoken)
        navigate("/login")
        showAlert("succesfully created","success")
      }
      else{
        showAlert("Invalid User","Error")
      }
  }
  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3">
    //       <label htmlFor="name" className="form-label">Name</label>
    //       <input type="text" name="name" className="form-control" onChange={onChange} id="name" />
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="email" className="form-label">Email address</label>
    //       <input type="email" className="form-control" id="email" onChange={onChange} name="email" />
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="password" className="form-label">Password</label>
    //       <input type="password" name='password' onChange={onChange} className="form-control" id="password"/>
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="cpassword" className="form-label">ConfirmPassword</label>
    //       <input type="password" onChange={onChange} className="form-control" id="cpassword" name="cpassword" />
    //     </div>
    //     <button type="submit" className="btn btn-primary">Submit</button>
    //   </form>
    // </div>
    <section className="container">
        <div className="login-container">
          <div className="circle circle-one"></div>
          <div className="form-container">
            <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
            <h1 className="opacity">REGISTER</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter Name" onChange={onChange} id="name" />
            <input type="email" id="email" onChange={onChange} placeholder="Enter Email" name="email" />
            <input type="password" name='password' placeholder="Password" onChange={onChange} id="password"/>
            <input type="password" onChange={onChange} id="cpassword" placeholder="conform Password" name="cpassword" />
            <button type="submit" className="opacity">Register</button>
            </form>
          </div>
          <div className="circle circle-two"></div>
        </div>
        <div className="theme-btn-container"></div>
      </section>
  )
}

export default Signup
