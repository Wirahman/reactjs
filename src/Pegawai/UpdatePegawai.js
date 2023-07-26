import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getUsername, logout ,getUser, removeUserSession } from '../Utils/Common';
import {
    BootstrapTable, 
    TableHeaderColumn
} from 'react-bootstrap-table';
import './ListPegawai.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import Table from 'react-bootstrap/Table';

const theme = createTheme()
 
function UpdatePegawai(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    let [idEdit, setID] = useState('');
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [photo, setPhoto] = useState('');

    const headers = {
        headers: { Authorization: 'Bearer 4pb4tech' }
    };
    const ip = 'http://localhost:8080';
    const url = ip + '/updatePegawai';
    const urlGetData = ip + '/getByParamsPegawai'
    
    const { id } = useParams();
    
    const getData = (event) => {
        setLoading(true);
        axios.post(urlGetData, { id: id }, headers).then(response => {
            setLoading(false);
            console.log("response");
            console.log(response);
            console.log("response.data.id");
            console.log(response.data.id);
            setID(response.data.id);
            setName(response.data.name);
            setEmail(response.data.email);
            setPhoto(response.data.photo);
        }).catch(error => {
            setLoading(false);
            if (error.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            email: data.get('email'),
            photo: data.get('photo'),
        });
            
        axios.post(url, { id: data.get('idEdit'),  name: data.get('name'), email: data.get('email'), photo: data.get('photo') }, headers).then(response => {
            
            // props.history.push('/dashboard');
            window.location.href = "/pegawai";
        }).catch(error => {
            setLoading(false);
            if (error.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    };

    useEffect(() => {
        console.log("ID Update Pegawai");
        console.log(id);
        getData();
    }, []);
 
    if (loading) return <h1>Loading data</h1>;
    else if (id)
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Typography component="h1" variant="h5">
                        Update Data Pegawai
                    </Typography>
                    
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="idEdit"
                        label="Enter ID"
                        name="idEdit"
                        value={idEdit}
                        autoComplete="idEdit"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Enter Name"
                        name="name"
                        value={name}
                        onChange = {(e) => setName(e.target.value)}
                        autoComplete="name"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Enter Email"
                        id="email"
                        value={email}
                        onChange = {(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="photo"
                        label="Enter Photo"
                        id="photo"
                        value={photo}
                        onChange = {(e) => setPhoto(e.target.value)}
                        autoComplete="photo"
                        />
                        
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Simpan
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default UpdatePegawai;