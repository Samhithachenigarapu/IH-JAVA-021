import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function CreateEmployeeComponent() 

{

  const navigate=useNavigate();

  const [employee,setEmployee]=useState({

    firstName:"",
    lastName:"",
    email:""

  });

  
  const handleClick=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setEmployee({...employee,[name]:value});
  }    

  const saveHandler=(e)=>
  {
    e.preventDefault();
    console.log("employee =>"+JSON.stringify(employee));

    EmployeeService.createEmployee(employee).then(res=>
    {
      navigate('/employees');
    })

  }

  const cancelHandler=(e)=>
  {
    navigate('/employees');
  }

  return (
    <div className='container' style={{marginTop:"50px"}}>
      <div className='row'>
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3 className='text-center' style={{marginTop:"50px"}}> Add Employee </h3>
               <div className="card-body">

          <form>
            <div className="form-group my-2">
             <label className='my-3' > FirstName : </label>
             <input type='text' name='firstName' className='form-control'value={employee.firstname} onChange={handleClick}/>            
            </div>
            <div className="form-group my-2">
                <label className='my-3'> LastName : </label>
                <input type='text' name='lastName' className='form-control' value={employee.lastname} onChange={handleClick}/>
            </div>
            <div className="form-group my-2">
              <label className='my-3'> Email : </label>
              <input type='text' name='email' className='form-control' value={employee.email}onChange={handleClick}/>
            </div> 

            <div>
              <button className='btn btn-success mt-3' onClick={saveHandler}>save</button>
              <button className='btn btn-danger mt-3' onClick={cancelHandler} style={{marginLeft:"10px"}}>Cancel</button>
              </div>
          </form>
     
      
      
       
      
    </div>
    </div>
    </div>
    </div>
  )
}

export default CreateEmployeeComponent
