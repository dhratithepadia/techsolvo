import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Modal ,ModalBody,ModalFooter,Button,ModalHeader} from 'reactstrap';
import {dataJSON} from './db';
import Employeeform from './Form'
import { FormContext } from './App';

const Home = () => {
    const initialForm = {name: "", number: "", email: "", dob: "", address: "", job_location: "", designation: ""}

    const [data , setData]= useState(dataJSON.employee)
    const [formState, setFormState] = useState(initialForm);
    const [modal, setModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({});
    const toggle = (updateData) => {if(Array.isArray(updateData)) { setData(updateData) }; setModal(!modal)} ;
    const handleUpdate = ()=> {
    }

    let history = useHistory();

    const formHandler = ()=>{
        history.push("/Form")
    }

    const onDelete = (id)=>{
        let remove = data.filter((i) => i.id !== id)
        console.log(remove)
      setData(remove);
    }
  return (
    <>
    <h2>Employee Data</h2>
    <div className='addButton'>
        <button className='btn btn-success' onClick={formHandler}>Add Employee</button>
    </div>
    <div>
    <table className="table">
  <thead className="thead-dark">
    <tr className='tableRow'>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Mobile no.</th>
      <th scope="col">Email</th>
      <th scope="col">DOB</th>
      <th scope="col">Address</th>
      <th scope="col">Job-Location</th>
      <th scope="col">Designation</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {data.map((emp, i)=> {
         return (
        <tr>
         <th scope="row">{i + 1}</th>
         <td>{emp.name}</td>
         <td>{emp.number}</td>
         <td>{emp.email}</td>
         <td>{emp.dob}</td>
         <td>{emp.address}</td>
         <td>{emp.job_location}</td>
         <td>{emp.designation}</td>
         <td><button className='btn btn-primary'onClick={()=> {setCurrentEmployee(emp);toggle(); }}>Edit</button>
            <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered">
                <ModalHeader toggle={toggle}>Edit Form</ModalHeader>
                <ModalBody>
                    <Employeeform formData={currentEmployee} isUpdate={true} toggle={toggle} />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
         <button className='btn btn-danger' onClick={()=>{onDelete(emp.id)}}>Delete</button></td>
       </tr>)
    })}
   
  </tbody>
</table>

    </div>
    </>
  )
}

export default Home