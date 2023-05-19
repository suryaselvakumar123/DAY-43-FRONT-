import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';



const userValidationSchema = yup.object({
    secretCode: yup.number().required('OTP is mandatory'),
    newPassword: yup.string().required('Password is required'),
});

const theme = createTheme();

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            secretCode: '',
            newPassword: '',
        },
        validationSchema: userValidationSchema,
        onSubmit: (newUser) => {
            createUser(newUser);
        },
    });

    const createUser = (newUser) => {
        fetch(`https://password-reset-rvl2.onrender.com/passwordReset`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => {
                if (res.status === 400) {
                    throw new Error('User does not exist');
                } else {
                    alert('Password reset successful');
                    localStorage.setItem('authenticated', true);
                    navigate('/');
                }
            })
            .then((data) => data.json())
            .then((data) => console.log(data))
            .catch((err) => setError(err.message));

        setUser({ ...user, ...newUser });
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
                        Please type the OTP received from your Email Id and the New Password
                    </Typography>
                    <br />
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            id="secretCode"
                            name="secretCode"
                            label="OTP"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.secretCode}
                            style={{ width: '500px' }}
                        />
                        <br />
                        {formik.touched.secretCode && formik.errors.secretCode ? (
                            <Typography color="error">{formik.errors.secretCode}</Typography>
                        ) : null}
                        <br />
                        <TextField
                            id="newPassword"
                            name="newPassword"
                            label="New password"
                            variant="outlined"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.newPassword}
                            style={{ width: '500px' }}
                        />
                        <br />
                        {formik.touched.newPassword && formik.errors.newPassword ? (
                            <Typography color="error">{formik.errors.newPassword}</Typography>
                        ) : null}
                        <br />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Submit
                        </Button>
                        {error && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

