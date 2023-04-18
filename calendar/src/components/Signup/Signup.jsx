import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MainIcon from '../../images/MainIcon.png';
import styles from './Signup.module.css';
import axios from 'axios'

export default function SignUp() {
    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [value, setValue] = useState(dayjs());

    const handleInputName = (event) => {
        const { value } = event.target
        setNameInput(value)
    }

    const handleInputEmail = (event) => {
        const { value } = event.target
        setEmailInput(value)
    }

    const handleInputPassword = (event) => {
        const { value } = event.target
        setPasswordInput(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('http://localhost:8080/auth/signup', {
            username: nameInput,
            userId: emailInput,
            password: passwordInput
        })

        const { status, data } = response;
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
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
                            label="이름"
                            name="name"
                            autoFocus
                            onInput={handleInputName}
                        />
                        <TextField className={styles.textField}
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            label="이메일"
                            name="id"
                            onInput={handleInputEmail}
                        />
                        <TextField className={styles.textField}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            onInput={handleInputPassword}
                        />
                        <TextField className={styles.textField}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호 확인"
                            type="password"
                            id="password"
                            onInput={handleInputPassword}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ width: '100%', '& .MuiFormControl-root': { width: '100%', mt: 1 } }}>
                                <DatePicker
                                    label="생년월일"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <div className={styles.buttonContainer} sx={{ mt: 1 }}>
                            <Button variant="outlined" sx={{ width: '100%', mt: 3, height: '45px' }}>
                                이메일 인증하기
                            </Button>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ backgroundColor: '#0040ff', mt: 2, mb: 1, height: '45px' }}
                            onClick={handleSubmit}
                        >
                            회원가입
                        </Button>
                    </Box>
                </div>
            </Box>
        </Container>
    );
}