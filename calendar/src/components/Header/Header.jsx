import React, { useEffect, useState } from "react";
import MainIcon from "../../images/MainIcon.png";
import Button from '@mui/material/Button';
import cookie from 'js-cookie'
import { useNavigate } from "react-router-dom";
import CalendarIcon from "../../images/CalendarIcon.png";
import GroupIcon from '../../images/GroupIcon.png';
import SettingIcon from '../../images/SettingIcon.png';

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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div></div>
            <img src={MainIcon} style={{ width: '80px', height: '100px', marginLeft: '210px', marginTop: '10px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
                    <p>{username} 님</p>
                    <div style={{ borderLeft: "solid gray", height: '50%', left: '50%', marginLeft: '10px' }}></div>
                    <Button variant="text" onClick={handleClickLogout} sx={{ color: 'gray' }}>로그아웃</Button>
                </div>
                <div>
                    <img src={CalendarIcon} style={{ width: '32px', height: '32px', margin: '5px', marginLeft: '43px' }} />
                    <img src={GroupIcon} style={{ width: '32px', height: '32px', margin: '5px' }} />
                    <img src={SettingIcon} style={{ width: '32px', height: '32px', margin: '3px', marginRight: '55px' }} />
                </div>
            </div>

        </div>
    )
}