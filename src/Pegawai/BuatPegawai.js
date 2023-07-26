import React, { useState, useEffect } from 'react';
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
 
function BuatPegawai(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const headers = {
        headers: { Authorization: 'Bearer 4pb4tech' }
    };
    const ip = 'http://localhost:8080';
    const url = ip + '/createPegawai';
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            email: data.get('email'),
            photo: data.get('photo'),
        });
            
        axios.post(url, { name: data.get('name'), email: data.get('email'), photo: data.get('photo') }, headers).then(response => {
            
            // props.history.push('/dashboard');
            window.location.href = "/pegawai";
        }).catch(error => {
            setLoading(false);
            if (error.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    };

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
                        Buat Pegawai Baru
                    </Typography>
                    
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Enter Name"
                        name="name"
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
                        autoComplete="email"
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="photo"
                        label="Enter Photo"
                        id="photo"
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


export default BuatPegawai;