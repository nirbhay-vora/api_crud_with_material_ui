import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import { useFormik } from 'formik';
import { signupSchema } from './schemas';


const initialValues = {
    name: "",
    email: "",
    mobile: ""
};


function AddEmployee() {
    const navigate = useNavigate();

    //Handle form
    const { errors, touched, handleSubmit ,handleChange,handleBlur} = useFormik({
        initialValues: initialValues,
        validationSchema: signupSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (formValues) => {
            submitForm(formValues);
          },
    })
    console.log("Errors ",errors)


 

    const [employee, addEmployee] = useState({
        id: "",
        name: "",
        email: "",
        mobile: ""
    })

    const onInputChange = (e) => {
        handleChange(e)
        addEmployee({
            ...employee,
            id: Math.floor(Math.random() * 10),
            [e.target.name]: e.target.value
        })
    }

    const backToHome = () => {
        navigate("/")
    }



    const submitForm = async () => {
     

        try {
            const response = await axios.post("http://localhost:3000/users", employee);

            console.log("Success:", response.data);
        } catch (error) {
            console.log("Error:", error.response.data);
        }
        navigate("/")
    };









    return (
        <>
            <div className='mainBody'>

                <h2 className='text-primary text-center  main-heading'>Add Employee Details</h2>
                <Container>

                    <hr className='w-50 m-auto my-4' />
                    <Form className='w-50 m-auto shadow p-5' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onBlur={handleBlur} name="name" onChange={e => onInputChange(e)} placeholder="Enter your name"  />
                            {errors.name && touched.name ? <p className="error-msg">{errors.name}</p> : null}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onBlur={handleBlur} name="email" onChange={e => onInputChange(e)} placeholder="Enter your email"  />
                            {errors.email && touched.email ? <p className="error-msg">{errors.email}</p> : null}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control type="text" onBlur={handleBlur} name="mobile" onChange={e => onInputChange(e)} placeholder="Enter your Mobile"  />
                            {errors.mobile && touched.mobile ? <p className="error-msg">{errors.mobile}</p> : null}
                        </Form.Group>

                        <Button variant="primary" className="me-5" type="submit"  >
                            Submit
                        </Button>
                        <Button variant="dark" className="text-white" onClick={backToHome}>
                            Back to home
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default AddEmployee