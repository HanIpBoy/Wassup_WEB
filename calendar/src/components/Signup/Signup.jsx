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
    const [birthInput, setBirthInput] = useState(dayjs());
    const [codeInput, setCodeInput] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);

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

    const handleInputPasswordCheck = (event) => {
        const { value } = event.target
        if (value !== passwordInput) {
            setPasswordCheck(true)
        } else {
            setPasswordCheck(false)
        }
    }

    const handleInputVerifyEmailCode = (event) => {
        const { value } = event.target
        setCodeInput(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();



        const responseEmail = await axios.post('http://13.125.238.167:8080/auth/email-verify', {
            userId: emailInput,
            emailAuthCode: codeInput
        })

        if (responseEmail.data.includes('success')) {
            window.alert('이메일 인증에 성공했습니다!')
        } else {
            window.alert('이메일 인증에 실패했습니다!')
            return
        }

        let month = birthInput.$M + 1
        let day = birthInput.$D

        if (month < 10) {
            month = '0' + month
        }

        if (day < 10) {
            day = '0' + birthInput.$D
        }

        const birth = birthInput.$y + '-' + month + '-' + day

        const response = await axios.post('http://13.125.238.167:8080/auth/signup', {
            username: nameInput,
            userId: emailInput,
            password: passwordInput,
            birth: birth
        })

        const { status, data } = response;

        console.log(response)

        window.history.pushState('', '', 'localhost:3000/calendar')
    };

    const handleClickEmail = async (event) => {
        const response = await axios.post('http://13.125.238.167:8080/auth/email-send', {
            userId: emailInput
        })
    }


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
                            error={passwordCheck}
                            helperText={passwordCheck === true ? "비밀번호가 일치하지 않습니다." : undefined}
                            margin="normal"
                            required
                            fullWidth
                            name="passwordcheck"
                            label="비밀번호 확인"
                            type="password"
                            id="passwordcheck"
                            onInput={handleInputPasswordCheck}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ width: '100%', '& .MuiFormControl-root': { width: '100%', mt: 1 } }}>
                                <DatePicker
                                    label="생년월일"
                                    value={birthInput}
                                    onChange={(newValue) => setBirthInput(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <div className={styles.buttonContainer} sx={{ mt: 1 }}>
                            <Button variant="outlined" sx={{ width: '100%', mt: 3, height: '45px' }}
                                onClick={handleClickEmail}>
                                이메일 인증하기
                            </Button>
                        </div>

                        <TextField className={styles.textField}
                            margin="normal"
                            required
                            fullWidth
                            name="verify"
                            label="인증번호 입력"
                            type="text"
                            id="verify"
                            onInput={handleInputVerifyEmailCode}
                        />

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