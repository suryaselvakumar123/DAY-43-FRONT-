import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const userValidationSchema = yup.object({
    email: yup.string().required('Email is mandatory'),
});

const theme = createTheme();

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: userValidationSchema,
        onSubmit: handleSubmit,
    });

    function handleSubmit(values) {
        createUser(values);
    }

    function createUser(newUser) {
        fetch('https://password-reset-rvl2.onrender.com/forgotPassword', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => {
                if (res.status === 400) {
                    alert('Email not registered');
                } else {
                    alert('Please check your email for OTP');
                    localStorage.setItem('authenticated', true);
                    navigate('/passwordreset');
                }
            })
            .then((data) => data.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));

        setUser({ ...user, ...newUser });
    }

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
                        Please type your email ID to reset your password
                    </Typography>
                    <br />
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>


                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            style={{ width: '500px' }}
                        />
                        <br />
                        {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                        <br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default ForgotPassword;
