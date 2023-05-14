import React, { useEffect, useState } from "react";
import MainIcon from "../../images/MainIcon.png";
import Button from '@mui/material/Button';
import cookie from 'js-cookie'
import { useNavigate } from "react-router-dom";
import Calendar from "../../images/Calendar.png";
import CalendarTab from "../../images/CalendarTab.png";
import GroupIcon from '../../images/GroupIcon.png';
import SettingIcon from '../../images/SettingIcon.png';

export default function Header() {
    const [username, setUserName] = useState('')
    const [tab, setTab] = useState('') // 'calendar' | 'groups' | 'setting'

    useEffect(() => {
        setUserName(cookie.get('username'))
        setTab(window.location.pathname)
    }, [])

    const navigate = useNavigate()
    const handleClickLogout = (event) => {
        // TODO: 서버에 로그아웃 요청
        cookie.remove('token')
        cookie.remove('username')
        cookie.remove('userId')
        window.alert('로그아웃이 완료되었습니다!')
        navigate('/signin')
    }

    return (

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', fontFamily: 'var(--font-PoorStory)', margin: '0 50px' }}>
            <img src={MainIcon} style={{ width: '80px', height: '100px', marginTop: '10px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{username} 님</p>
                    <div style={{ borderLeft: "solid gray", height: '50%', left: '50%', marginLeft: '10px' }}></div>
                    <Button variant="text" onClick={handleClickLogout} sx={{ color: 'gray', fontFamily: 'var(--font-PoorStory)' }}>로그아웃</Button>
                </div>
                <div style={{ display: 'flex', columnGap: '10px' }}>
                    <img src={tab === '/calendar' ? CalendarTab : Calendar} style={{ ...headerStyle }} />
                    <img src={GroupIcon} style={{ ...headerStyle }} />
                    <img src={SettingIcon} style={{ ...headerStyle }} />
                </div>
            </div>
        </div>
    )
}

const headerStyle = {
    width: '32px', height: '32px', cursor: 'pointer'
}