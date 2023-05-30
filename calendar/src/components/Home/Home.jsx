import React from 'react';
import styles from './Home.module.css';
import MainIcon from '../../images/MainIcon.png';
import FirstHomePicture from '../../images/FirstHomePicture.png';
import SecondHomePicture from '../../images/SecondHomePicture.png';
import ThirdHomePicture from '../../images/ThirdHomePicture.png';
import Link from '@mui/material/Link';

export default function Home() {

    return (
        <>
            <div className={styles.firstLayout}>
                <img className={styles.mainIcon} src={MainIcon} /> {/* 메인 아이콘 */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Link href='/signin'> {/* url이 ~/signin 인 페이지로 이동 */}
                        <button className={styles.loginHome}>로그인</button> {/* 로그인 버튼 */}
                    </Link>
                    <Link href='/signup'>{/* url이 ~/signup 인 페이지로 이동 */}
                        <button className={styles.signUpHome} href="#">회원가입</button>{/* 회원가입 버튼 */}
                    </Link>
                </div>
            </div>
            <br />
            <div className={styles.introduce}>누구나 그룹을 만들어 관리할 수 있는 캘린더 서비스</div>
            <div className={styles.line} />
            <img className={styles.firstHomePicture} src={FirstHomePicture} />
            <img className={styles.secondHomePicture} src={SecondHomePicture} />
            <img className={styles.thirdHomePicture} src={ThirdHomePicture} />
        </>
    )
}