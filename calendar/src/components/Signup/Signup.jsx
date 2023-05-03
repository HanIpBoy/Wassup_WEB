import React, { useEffect, useState } from 'react';
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
import axios from '../../axios';
import { useNavigate } from 'react-router-dom' //페이지 이동해주는 훅

export default function SignUp() {
    const [nameInput, setNameInput] = useState('') //이름 값
    const [emailInput, setEmailInput] = useState('') // 이메일 값
    const [passwordInput, setPasswordInput] = useState('') //비밀번호 값
    const [birthInput, setBirthInput] = useState(dayjs()); //생일 값
    const [codeInput, setCodeInput] = useState(''); //이메일 인증번호 값
    const [passwordCheck, setPasswordCheck] = useState(false); //비밀번호확인 값
    const [emailCheck, setEmailCheck] = useState(); //인증번호 체크
    const [submittable, setSubmittable] = useState(false); //회원가입 가능여부

    const navigate = useNavigate()

    useEffect(() => {
        if (nameInput && emailInput && passwordInput && birthInput && codeInput || passwordCheck && emailCheck)
            setSubmittable(true)
        else
            setSubmittable(false)
    }, [nameInput, emailInput, passwordInput, birthInput, codeInput, passwordCheck, emailCheck])

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

        const response = await axios.post('/auth/signup', { //회원가입 버튼 클릭시 서버로 post
            username: nameInput,
            userId: emailInput,
            password: passwordInput,
            birth: birth
        })

        const { status, data } = response;
        window.alert('회원가입이 완료되었습니다!')
        console.log(response)

    };


    const handleClickEmail = async (event) => {   //이메일 인증하기 버튼 이벤트 핸들러
        window.alert('이메일에서 인증번호를 입력해주세요.')
        const response = await axios.post('/auth/email-send', {
            userId: emailInput
        })
    }

    const handleClickVerifyEmailCode = async (event) => { //확인 버튼 클릭 이벤트 핸들러
        event.preventDefault();

        const responseEmail = await axios.post('/auth/email-verify', { //이메일 인증요청
            userId: emailInput,
            emailAuthCode: codeInput
        })

        if (responseEmail.data.includes('success')) { //만약 서버에서 보내준 값에 "success" 값이 있을 경우
            window.alert('이메일 인증에 성공했습니다!') //성공 alert를 띄운 후 그대로 실행
            setEmailCheck(true)
        } else {
            window.alert('이메일 인증에 실패했습니다!') //실패 alert를 띄운 후 그대로 종료
            setEmailCheck(false)
            return
        }

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
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
                            <TextField className={styles.textField}
                                margin="normal"
                                required
                                fullWidth
                                id="id"
                                label="이메일"
                                name="id"
                                onInput={handleInputEmail}
                            />
                            <div className={styles.buttonContainer}>
                                <Button variant="outlined" sx={{ width: '94%', height: '55px', mt: 2, ml: 1 }}
                                    onClick={handleClickEmail}>
                                    이메일 인증
                                </Button>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
                            <TextField className={styles.textField}
                                error={emailCheck === false}
                                helperText={emailCheck === false ? "다시 입력해주세요." : undefined}
                                margin="normal"
                                required
                                fullWidth
                                name="verify"
                                label="인증번호 입력"
                                type="text"
                                id="verify"
                                onInput={handleInputVerifyEmailCode}
                            />
                            <div className={styles.buttonContainer}>
                                <Button variant="outlined" sx={{ width: '90%', height: '55px', mt: 2, ml: 1 }}
                                    onClick={handleClickVerifyEmailCode}>
                                    확인
                                </Button>
                            </div>
                        </div>
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
                        <Link href='/signin'>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ backgroundColor: '#0040ff', mt: 2, mb: 1, height: '45px' }}
                                onClick={handleSubmit}
                                disabled={!submittable}
                            >
                                회원가입
                            </Button>
                        </Link>
                    </Box>
                </div>
            </Box>
        </Container>
    );
}