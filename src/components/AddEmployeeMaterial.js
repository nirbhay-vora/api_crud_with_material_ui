import React, { useState, useRef } from 'react'
import Typography from '@mui/material/Typography';

import { Box, TextField, Button, InputLabel, Input, FormHelperText } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { signupSchema } from './schemas';
import { useFormik } from 'formik';
import FormControl from '@mui/material/FormControl';


const initialValues = {
    name: "",
    email: "",
    mobile: ""
};
function AddEmployeeMaterial() {
    const navigate = useNavigate();


    // //Handle form
    const { values, errors, touched, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        validationSchema: signupSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (formValues) => {
            submitForm(formValues);
        },
    })
    console.log("values ", values)



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
            [e.target.name]: e.target.value,
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

    const CustomField = styled(TextField)({
        width: "80%",
    });

    return (
        <>


            <Box
                component="form"

                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    width: "40%",
                    margin: "5% auto",
                    padding: "3% 0"
                }}
                onSubmit={handleSubmit}

            >
                <Typography variant="h2"
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#1769aa',
                        margin: "2% 0",
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        textAlign: 'center',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    }} >
                    Add Employee detail
                </Typography>
                

                

                    <CustomField
                        label="Name"
                        variant="outlined"
                        type="text"
                        name="name"
                        onChange={e => onInputChange(e)}
                        value={values.name}
                        error={touched.name && errors.name}
                        helperText={touched.name && errors.name}
                    />
            
                    <CustomField
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                     
                        onChange={e => onInputChange(e)}
                        value={values.email}
                        error={touched.email && errors.email}
                        helperText={touched.email && errors.email}
                    />
               
                    <CustomField
                        label="Mobile"
                        variant="outlined"
                        type="phone"
                        name="mobile"
                        onChange={e => onInputChange(e)}
                        value={values.mobile}
                        error={touched.mobile && errors.mobile}
                        helperText={touched.mobile && errors.mobile}
                    />
       

                <Button variant="contained" type="submit" sx={{ width: "80%" }}>Submit</Button>
                <Button variant="contained" sx={{
                    width: "80%", backgroundColor: "white", color: "black",
                    "&:hover": { backgroundColor: "black", color: "white" }
                }}

                    onClick={backToHome}
                >Back to home</Button>
            </Box>
        </>
    )
}

export default AddEmployeeMaterial