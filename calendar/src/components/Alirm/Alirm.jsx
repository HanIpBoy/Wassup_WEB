import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import AlirmItem from './AlirmItem.jsx';
import axios from "../../axios.js";

export default function Alirm({ alirms }) {

    const [updatedAlirms, setUpdatedAlirms] = useState([]) //업데이트된 알람 상태 저장, 빈 배열로 관리
    const [isLoading, setIsLoading] = useState(true) //로딩 상태 관리
    const [alirmSuccess, setAlirmSuccess] = useState()

    console.log('alirms는 ??? ', alirms)
    useEffect(() => {
        if (alirms !== undefined) {
            setUpdatedAlirms(alirms)
            setIsLoading(false) //데이터 도착 후 로딩 상태를 false로 변경
        }

    }, [])

    if (updatedAlirms === undefined) {
        return null; // alirms가 undefined인 경우 렌더링하지 않음
    }

    if (isLoading) {
        return <div>Loading...</div>; // 로딩 중일 때 로딩 표시
    }


    const handleClickYes = async () => { //예 버튼 클릭시 작동되는 핸들러
        const payload = { //서버의 /group/invitation/accept로 보내는 페이로드
            originKey: alirms.originKey,
            groupOriginKey: alirms.groupOriginKey

        }

        let response = await axios.post('/group/invitation/accept', payload)
        if (response.data.status === 'succeed') { //서버 응답 성공 시 onSubmitAlirm 실행
            let responseDelete = await axios.delete(`/user/notification/${alirms.originKey}`)
            if (responseDelete.data.status === 'succeed') {
                axios.get('user/notification/unread').then((response) => {
                    setUpdatedAlirms(response.data.data[0])
                })

            }
        }
    }

    const handleClickNo = () => { //아니오 버튼 클릭시 작동되는 핸들러

    }

    return (
        <>

            <div style={{
                backgroundColor: 'rgba(219,230,243,0.5)',
                height: 'auto',
                marginLeft: '20%',
                marginRight: '20%',
                marginBottom: '50px',
                paddingBottom: '10px',
                borderRadius: '30px',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.2)'
            }}>

                {updatedAlirms.map((value, idx) => {
                    return <div key={idx}>
                        <hr style={{ borderTop: '1px solid rgba(0,0,0,0.1)', width: '100%' }} />
                        <AlirmItem alirm={value} onClickYes={handleClickYes} onClickNo={handleClickNo} />
                    </div>
                })}
            </div>
        </>
    )
}