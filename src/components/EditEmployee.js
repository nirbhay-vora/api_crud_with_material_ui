import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'
import { useFormik } from 'formik';
import { signupSchema } from './schemas';


function EditEmployee() {
    const navigate = useNavigate();

    const { id } = useParams();

    // const [name,setName] = useState("");
    // const [email,setEmail] = useState("");
    // const [mobile,setMobile] = useState("");


    // const [employee, addEmployee] = useState({
    //     id: id,
    //     name: "",
    //     email: "",
    //     mobile:""
    // })
    let { setValues,values,errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: ""
        },
        validationSchema: signupSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (formValues) => {
            submitForm(formValues);
        },
    })


    // const onInputChange = (e) => {
    //     handleChange(e)
    //     addEmployee({
    //         ...employee,
    //         id: Math.floor(Math.random() * 10),
    //         [e.target.name]: e.target.value
    //     })
    // }

    const backToHome = () => {
        navigate("/")
    }

    useEffect(() => {
        const displaySelectedEmpData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users/" + id);
                setValues(response.data);
                // let updatedValues = { name, email, mobile };
                // values = updatedValues;
                console.log("values ",values)
                

            }
            catch (error) {
                console.log(error)
            }
        }

        displaySelectedEmpData()
    }, [id,setValues])






    const submitForm = async (e) => {

        try {
            const response = await axios.put(`http://localhost:3000/users/${id}`, values)
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
                    <Form className='w-50 m-auto shadow p-5' onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" onBlur={handleBlur} name="name" value={values.name} onChange={handleChange} placeholder="Enter your name" required />
                            {errors.name && touched.name ? <p className="error-msg">{errors.name}</p> : null}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onBlur={handleBlur} name="email" value={values.email} onChange={handleChange} placeholder="Enter your email" required />
                            {errors.email && touched.email ? <p className="error-msg">{errors.email}</p> : null}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control type="number" onBlur={handleBlur} name="mobile" value={values.mobile} onChange={handleChange} placeholder="Enter your Mobile" required />
                            {errors.mobile && touched.mobile ? <p className="error-msg">{errors.mobile}</p> : null}
                        </Form.Group>

                        <Button variant="primary" className="me-5" type="submit" onClick={handleSubmit} >
                            Update
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

export default EditEmployee