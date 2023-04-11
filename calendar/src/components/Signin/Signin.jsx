import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainIcon from '../../images/MainIcon.png';
import styles from './Signin.module.css';


const theme = createTheme();

export default function SignIn() {

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
    id: data.get('id'),
    password: data.get('password'),
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

        <img className={styles.mainIcon} src={MainIcon} />

        <div className={styles.container}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField className={styles.textField}
            margin="normal"
            required
            fullWidth
            id="id"
            label="이메일"
            name="id"
            autoComplete="email"
            autoFocus
            />
            <TextField className={styles.textField}
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            />
            <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="아이디 기억하기"
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ backgroundColor:'#0040ff', mt: 3, mb: 2 }}
            >
            로그인
            </Button>
            <button className={styles.signUp} href="#">계정을 만들어보자!</button>
        </Box>
        <Link className={styles.forgotPassword} href="#" variant="body1">
            비밀번호를 까먹으셨나?
        </Link>
        </div>
        </Box>
    </Container>
    </ThemeProvider>
);
}