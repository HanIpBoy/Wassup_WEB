import React, { useEffect, useState } from "react";
import MainIcon from "../../images/MainIcon.png";
import Button from '@mui/material/Button';
import cookie from 'js-cookie'
import { useNavigate } from "react-router-dom";
export default function Header() {
    const [username, setUserName] = useState('')
    useEffect(() => {
        setUserName(cookie.get('username'))
    }, [])

    const navigate = useNavigate()
    const handleClickLogout = (event) => {
        // TODO: 서버에 로그아웃 요청
        cookie.remove('token')
        cookie.remove('username')
        window.alert('로그아웃이 완료되었습니다!')
        navigate('/signin')
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={MainIcon} style={{ width: '8%' }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{username} 님</p>
                    <Button variant="text" onClick={handleClickLogout}>로그아웃</Button>
                </div>
                <div style={{ backgroundColor: 'black', height: '30px', width: '200px' }} />
            </div>

        </div>
    )
}