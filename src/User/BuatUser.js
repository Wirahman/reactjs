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
import './ListUser.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';
import Table from 'react-bootstrap/Table';

const theme = createTheme()
 
function BuatUser(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const headers = {
        headers: { Authorization: 'Bearer 4pb4tech' }
    };
    const ip = 'http://localhost:8080';
    const url = ip + '/createUsers';
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        });
            
        axios.post(url, { 
            name: data.get('name'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password')
        }, headers).then(response => {
            
            // props.history.push('/dashboard');
            window.location.href = "/user";
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
                        Buat User Baru
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
                        id="username"
                        label="Enter Username"
                        name="username"
                        autoComplete="username"
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
                        name="password"
                        label="Enter Password"
                        id="password"
                        autoComplete="password"
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


export default BuatUser;