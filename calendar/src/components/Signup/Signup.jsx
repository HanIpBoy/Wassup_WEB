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
    const [nameInput, setNameInput] = useState('') //이름 값
    const [emailInput, setEmailInput] = useState('') // 이메일 값
    const [passwordInput, setPasswordInput] = useState('') //비밀번호 값
    const [birthInput, setBirthInput] = useState(dayjs()); //생일 값
    const [codeInput, setCodeInput] = useState(''); //이메일 인증번호 값
    const [passwordCheck, setPasswordCheck] = useState(false); //비밀번호확인 값

    const handleInputName = (event) => { //이름 이벤트 핸들러
        const { value } = event.target
        setNameInput(value)
    }

    const handleInputEmail = (event) => { //이메일 이벤트 핸들러
        const { value } = event.target
        setEmailInput(value)
    }

    const handleInputPassword = (event) => { //비밀번호 이벤트 핸들러
        const { value } = event.target
        setPasswordInput(value)
    }

    const handleInputPasswordCheck = (event) => { //비밀번호 확인 이벤트 핸들러
        const { value } = event.target
        if (value !== passwordInput) {
            setPasswordCheck(true)
        } else {
            setPasswordCheck(false)
        }
    }

    const handleInputVerifyEmailCode = (event) => { //인증번호 입력 이벤트 핸들러
        const { value } = event.target
        setCodeInput(value)
    }

    const handleSubmit = async (event) => { //회원가입 버튼 이벤트 핸들러
        event.preventDefault();



        const responseEmail = await axios.post('http://13.125.122.132:5005/auth/email-verify', { //이메일 인증요청
            userId: emailInput,
            emailAuthCode: codeInput
        })

        if (responseEmail.data.includes('success')) { //만약 서버에서 보내준 값에 "success" 값이 있을 경우
            window.alert('이메일 인증에 성공했습니다!') //성공 alert를 띄운 후 그대로 실행
        } else {
            window.alert('이메일 인증에 실패했습니다!') //실패 alert를 띄운 후 그대로 종료
            return
        }

        //데이터값들을 서버 요청 양식에 맞게 재가공
        let month = birthInput.$M + 1 //월
        let day = birthInput.$D //일

        if (month < 10) { //10월 이전 생월일 경우
            month = '0' + month
        }

        if (day < 10) { //10일 이전 생일일 경우
            day = '0' + birthInput.$D
        }

        const birth = birthInput.$y + '-' + month + '-' + day //서버 요청 양식에 맞춘 새로운 birth값 생성

        const response = await axios.post('http://13.125.122.132:5005/auth/signup', { //회원가입 버튼 클릭시 서버로 post
            username: nameInput,
            userId: emailInput,
            password: passwordInput,
            birth: birth
        })

        const { status, data } = response;

        console.log(response)

        window.history.pushState('', '', 'localhost:3000/calendar') //calendar 페이지로 이동
    };


    const handleClickEmail = async (event) => {   //이메일 인증하기 버튼 이벤트 핸들러
        const response = await axios.post('http://13.125.122.132:5005/auth/email-send', {
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