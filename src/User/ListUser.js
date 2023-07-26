import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { getUsername, logout ,getUser, removeUserSession } from '../Utils/Common';
import {
    BootstrapTable, 
    TableHeaderColumn
} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import Table from 'react-bootstrap/Table';

import './ListUser.css';
import BuatUser from './BuatUser';
 
function ListUser(props) {
    const [dataUser, setdataUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const headers = {
        headers: { Authorization: 'Bearer 4pb4tech' }
    };

    const ip = 'http://localhost:8080';
    const url = ip + '/getAllUsers';

    const urlDelete = ip + '/deleteUsers';
      
    useEffect(() => {
        setLoading(true);
        axios.get(url, {  }, headers).then(response => {
            setLoading(false);
            console.log(response.data.user);
            setdataUser(response.data.user);
            console.log("User");
            console.log(dataUser);
        }).catch(error => {
            setLoading(false);
            if (error.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
        
    }, []);

    const deleteData = (event, id) => {
        console.log("Function Data Dipanggil");
        console.log("ID yang dilempar = " + id);
        console.log(urlDelete + '?id=' + id);
        axios.get(urlDelete + '?id=' + id, headers).then(response => {
            console.log("Haha");
            setLoading(false);
            window.location.href = "/user";
        }).catch(error => {
            setLoading(false);
            if (error.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
        
    }
 
    if (loading) return <h1>Loading data</h1>;
    else if (dataUser)
    return (
        <div>
            <a href="/buatUser">Buat User Baru</a>
            <table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <td className="text-center">Action</td>
                </tr>
                </thead>
                <tbody>
                {dataUser.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.id}</td>
                            <td>{val.name}</td>
                            <td>{val.username}</td>
                            <td>{val.email}</td>
                            <td className="text-center">
                                <a href={`/updateUser/${val.id}`}>Edit</a> &nbsp;
                                <a onClick={(event) => deleteData(event, `${val.id}`)}>Delete</a>
                            </td>
                        </tr>
                    )
                })}
                
                </tbody>
            </table>
            
        </div>
    );
}


export default ListUser;