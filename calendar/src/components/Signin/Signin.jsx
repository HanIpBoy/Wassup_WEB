import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MainIcon from '../../images/MainIcon.png';
import styles from './Signin.module.css';
import axios from '../../axios';
import cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom' //페이지 이동해주는 훅

export default function SignIn() {

    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [checkEmail, setCheckEmail] = useState(false)
    const navigate = useNavigate()


    const handleInputEmail = (event) => {
        const { value } = event.target
        setEmailInput(value)
    }

    const handleInputPassword = (event) => {
        const { value } = event.target
        setPasswordInput(value)
    }

    const handleClickCheckEmail = (event) => {
        console.log(event)
        const { value, checked } = event.target
        setCheckEmail(checked)
    }

    const handleSubmit = async (event) => { // await을 사용하기 위해 async 함수로 선언
        event.preventDefault();

        try {
            const response = await axios.post('/auth/signin', { // axios는 항상 await과 함께 사용
                userId: emailInput,
                password: passwordInput
            })
            const { status, data } = response;
            cookie.set('token', data.token) //response의 data에 있는 token값 읽어오기
            navigate('/calendar')

        } catch (e) {
            window.alert("로그인에 실패했습니다. 아이디와 비밀번호를 다시 한번 확인해주세요!")
        }
    };

    return (
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
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField className={styles.textField}
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            label="이메일"
                            name="id"
                            autoComplete="email"
                            autoFocus
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
                            autoComplete="current-password"
                            onInput={handleInputPassword}
                        />
                        <FormControlLabel
                            control={<Checkbox value={checkEmail} color="primary" onClick={handleClickCheckEmail} />}
                            label="아이디 기억하기"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ backgroundColor: '#0040ff', mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            로그인
                        </Button>
                        <Link href='/signup'>
                            <Button className={styles.signUp} fullWidth variant='contained' sx={{ backgroundColor: '#000', mb: 2 }}>계정을 만들어보자!</Button>
                        </Link>
                    </Box>
                    <Link className={styles.forgotPassword} href="#" variant="body1">
                        비밀번호를 까먹으셨나?
                    </Link>
                </div>
            </Box >
        </Container >
    );
}