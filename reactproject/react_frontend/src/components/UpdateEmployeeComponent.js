import React, {useEffect } from 'react'
import { useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

function UpdateEmployeeComponent() {

  const navigate=useNavigate();

  const [firstName, setFirstName]=useState("");
  const [lastName, setLastName]=useState("");
  const [email, setEmail]=useState("");
  const {id}=useParams();
 
   useEffect(()=>
  {
    EmployeeService.getEmployeeById(id).then((res)=> 
    {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);

    }).catch(error=>
        {
            console.log(error);
        })

  },[id])

  const updateHandler=(e)=>
  {
     e.preventDefault();
     const employee={firstName,lastName,email};
     
     if(id){
            EmployeeService.updateEmployee(id,employee).then(res=>{
             navigate('/employees');
            }); 
     }
     else{    
             EmployeeService.createEmployee(employee).then(res=>
             {
             console.log(res.data);
             navigate('/employees');
 
         })
     }
  }
   
  const cancelHandler=(e)=>
  {
    navigate('/employees');
  }
  
  return (
    <div className="container" style={{marginTop:"50px"}}>
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center"  style={{marginTop:"50px"}}>Update Employee</h3>
              <div className="card-body">
                <form>
                  <div className="form-group my-2">
                    <label className='mt-3'>First Name:</label>
                    <input type='text' name="firstName" className="form-control"
                           value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                  </div>
                  <div className="form-group my-2">
                    <label  className='mt-3'>Last Name:</label>
                    <input type='text' name="lastName" className="form-control"
                           value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                  </div>

                  <div className="form-group my-2">
                    <label  className='mt-3'>Email:</label>
                    <input type='email' name="email" className="form-control"
                           value={email} onChange={(e)=> setEmail(e.target.value)}/>
                  </div>
                  <button className='btn btn-success' style={{marginTop:"10px"}}  onClick={updateHandler}>save</button>
                  <button className='btn btn-danger' onClick={cancelHandler}style={{marginLeft:"10px", marginTop:"10px"}}>cancel</button>
                </form>
              </div>
            </div>
          </div>  
      </div>

  )
}

export default UpdateEmployeeComponent
