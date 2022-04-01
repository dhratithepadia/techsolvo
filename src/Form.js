import React, {useContext, useState} from 'react'
import { Col, Input, Label, Row, FormGroup, Button } from "reactstrap";
import {dataJSON} from './db';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const Employeeform = (props) => {

    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name is required"),
        number: Yup.string()
            .required("Required")
            .matches(/^[0-9]+([.][0-9]+-)?$/, "Please Enter a valid Mobile.")
            .min(10, "Must exactly 10 digits")
            .max(10, "Must exactly 10 digits"),
        address: Yup.string().required("Address Is Required"),
        email: Yup.string().required("email is required").email("Invalid email")
    });


    const initialForm = {name: "", number: "", email: "", dob: "", address: "", job_location: "", designation: ""}
    const [formState, setFormState] = useState(props.formData || initialForm);
    let history = useHistory();
    const saveHandler = ()=>{
        if(props.isUpdate) {
            const updateData = dataJSON.employee.map((emp)=> {
                if(props.formData.id == emp.id) {
                    emp = formState;
                }
                return emp;
                
            });
            props.toggle(updateData);
        } else {
            dataJSON.employee.push(formState)
            console.log(dataJSON.employee)
            history.push("/")
        }
        
    }
  return (
    <>

    <div>
       <h2>Employee Form</h2> 
       <div className='container'>
           <Formik
                                initialValues={formState}
                                validationSchema={formSchema}
                                onSubmit={() => { }}>
                                {(props) => {
                                    const {
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        values,
                                        setFieldValue,
                                        errors
                                    } = props;
                                    console.log(props)
                                    return (<Form>
                                            <Row>
           <Col>
          <FormGroup>
            <Label for="name">First Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onBlur={handleBlur}
              onChange={(e)=> {setFormState({...formState, name: e.target.value});setFieldValue('name', e.target.value)}}
              value={formState.name}
              maxLength={35}
              minLength={5}
            />
          </FormGroup>
          <ErrorMessage name="name">
            {(msg) => {
                return (
                    <div className="user_manage_field-error text-danger">
                        {msg}
                    </div>
                )
            }}
            </ErrorMessage>
          </Col>
          <Col>
          <FormGroup>
            <Label for="name">Mobile No.</Label>
            <Input
              type="text"
              name="number"
              id="number"
              placeholder="mobile No."
              onBlur={handleBlur}
              onChange={(e)=> {setFormState({...formState, number: e.target.value});setFieldValue('number', e.target.value)}}
              value={formState.number}
              maxLength={10}
            />
          </FormGroup>
          <ErrorMessage name="number">
            {(msg) => {
                return (
                    <div className="user_manage_field-error text-danger">
                        {msg}
                    </div>
                )
            }}
            </ErrorMessage>
          </Col>
        </Row>
      <Row>
          <Col>
          <FormGroup>
            <Label for="name">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onBlur={handleBlur}
              onChange={(e)=> {setFormState({...formState, email: e.target.value});setFieldValue('email', e.target.value)}}
              value={formState.email}
              maxLength={30}
            />
          </FormGroup>
          <ErrorMessage name="email">
            {(msg) => {
                return (
                    <div className="user_manage_field-error text-danger">
                        {msg}
                    </div>
                )
            }}
            </ErrorMessage>
          </Col>
          <Col>
          <FormGroup>
            <Label for="name">Date of Birth</Label>
            <Input
              type='date'
              className="form-control calenderInput"
              name="DOB"
              id="DOB"
              placeholder="DOB"
              onChange={(e)=> {setFormState({...formState, dob: e.target.value});}}
              value={formState.dob}
            />
          </FormGroup>
          </Col>
      </Row>
      <Row>
          <Col>
          <FormGroup>
            <Label for="name">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              onBlur={handleBlur}
              onChange={(e)=> {setFormState({...formState, address: e.target.value});setFieldValue('address', e.target.value)}}
              value={formState.address}
              maxLength={30}
            />
          </FormGroup>
          <ErrorMessage name="address">
            {(msg) => {
                return (
                    <div className="user_manage_field-error text-danger">
                        {msg}
                    </div>
                )
            }}
            </ErrorMessage>
          </Col>
          <Col>
          <FormGroup>
            <Label for="name">Job Location</Label>
            <Input
              type="text"
              name="jobLocation"
              id="jobLocation"
              placeholder="Job location"
              onChange={(e)=> {setFormState({...formState, job_location: e.target.value})}}
              value={formState.job_location}
              maxLength={30}
            />
          </FormGroup>
          </Col>
      </Row>
      <Row>
          <FormGroup>
            <Label for="name">Designation</Label>
            <Input
              type="text"
              name="designation"
              id="designation"
              placeholder="Designation"
              onChange={(e)=> {setFormState({...formState, designation: e.target.value})}}
              value={formState.designation}
              maxLength={30}
            />
          </FormGroup>
      </Row>
                                            </Form>)
                                }}

                            </Formik>
       
      <button className='btn btn-primary' onClick={saveHandler}>{props.isUpdate ? "Update": "Save"}</button>
       </div>
    </div>
    
    </>
  )
}

export default Employeeform