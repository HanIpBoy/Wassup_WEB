import React from "react";
import Button from '@mui/material/Button';
import MiniIcon from '../../images/MiniIcon.png';

export default function NotLogin() {
    return (
        <>
            <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', marginTop: '50px' }}>
                <div style={{ fontSize: '32px' }}>
                    로그인 되어있지 않습니다.<br />
                    로그인을 완료해주세요!
                </div>
                <div>
                    <img src={MiniIcon} style={{ width: '110%', marginTop: '15px' }} />
                </div>
            </div>

            <div>
                <div>
                    <Button variant="text" sx={{ width: '120px', justifyContent: 'center' }}>로그인</Button>
                </div>
                <div>
                    <Button variant="text" sx={{ width: '120px', justifyContent: 'center' }}>회원가입</Button>
                </div>
            </div>
        </>
    )
}