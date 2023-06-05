import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import '../App.css'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import AddEmployee from './AddEmployee';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import EditEmployee from './EditEmployee';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddEmployeeMaterial from './AddEmployeeMaterial';



function Home() {

   

    const [employee, setEmployee] = useState([])
    const id = useParams();
    // console.log("🚀 ~ file: Home.js:21 ~ Home ~ id:", id)
    // console.log("id ", id)

    const displayData = async () => {
        const response = await axios.get(" http://localhost:3000/users")
        setEmployee(response.data)
    }

    const deleteEmployee = async (id) => {
        await axios.delete("http://localhost:3000/users/" + id)
        displayData()
    }

    useEffect(() => {
        displayData();
    }, [])
    return (
        <>

    


            <Container>
                <h1 className='text-primary m-3 text-center shadow  p-3'>Employee data</h1>
                <div className=" bg-danger">
                <Link to="/addEmployee" className='btn btn-warning alignAddBtn btn-sm'>Add Employee <AddCircleIcon /></Link>

                </div>


                {/* display employees data */}
                {employee.length>0 ?
                <Table className='shadow text-center ' size="md" bordered hover >

                    <thead  >
                        <tr >
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map((elem, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{elem.name}</td>
                                        <td>{elem.email}</td>
                                        <td>{elem.mobile}</td>
                                        <td>
                                            <Tooltip title="Edit">
                                                <IconButton>
                                                    <Link to={`/editEmployee/${elem.id}`}><EditIcon sx={{ color: "blue" }} /></Link>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => deleteEmployee(elem.id)} >
                                                    <DeleteIcon sx={{ color: pink[500] }} />
                                                </IconButton>
                                            </Tooltip>
                                        </td>

                                    </tr>
                                )
                            })
                        }



                    </tbody>

                </Table>
                : 
                <h3 className='text-center'>Employee is no more 😄</h3>
                }

            </Container>
        </>
    )
}

function ReadData() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addEmployee" element={<AddEmployeeMaterial />} />
                <Route path="/editEmployee/:id" element={<EditEmployee />} />
            </Routes>
        </BrowserRouter>
    );
}

export default ReadData