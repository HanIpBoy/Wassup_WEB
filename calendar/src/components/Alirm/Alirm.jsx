import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import AlirmItem from './AlirmItem.jsx';
import axios from "../../axios.js";

export default function Alirm({ alirms }) {

    const [updatedAlirms, setUpdatedAlirms] = useState([]) //업데이트된 알람 상태 저장, 빈 배열로 관리
    const [isLoading, setIsLoading] = useState(true) //로딩 상태 관리
    const [selectedAlirm, setSelectedAlirm] = useState() //선택된 알림
    const [alirmSuccess, setAlirmSuccess] = useState()

    useEffect(() => {
        if (alirms !== undefined) {
            setUpdatedAlirms(alirms)
            setIsLoading(false) //데이터 도착 후 로딩 상태를 false로 변경
        }

    }, [alirms])

    if (updatedAlirms === undefined) {
        return null; // alirms가 undefined인 경우 렌더링하지 않음
    }

    if (isLoading) {
        return <div style={{ textAlign: 'center' }}>Loading...</div>; // 로딩 중일 때 로딩 표시
    }


    const handleClickYes = async (alirm) => { //예 버튼 클릭시 작동되는 핸들러
        const payload = { //서버의 /group/invitation/accept로 보내는 페이로드
            originKey: alirm.originKey,
            groupOriginKey: alirm.groupOriginKey
        }

        let response = await axios.post('/group/invitation/accept', payload)
        if (response.data.status === 'succeed') { //서버 응답 성공 시 onSubmitAlirm 실행
            const alrimOriginKey = alirm.originKey;
            let responseDelete = await axios.delete(`/user/notification/${alrimOriginKey}`)
            if (responseDelete.data.status === 'succeed') {
                axios.get('user/notification/unread').then((response) => {
                    setUpdatedAlirms(response.data.data)
                })

            }
        }
    }

    const handleClickNo = async (alirm) => { //아니오 버튼 클릭시 작동되는 핸들러
        let responseDelete = await axios.delete(`/user/notification/${alirm.originKey}`)
        if (responseDelete.data.status === 'succeed') {
            axios.get('user/notification/unread').then((response) => {
                setUpdatedAlirms(response.data.data)
            })

        }
    }

    return (
        <>

            <div style={{
                backgroundColor: 'rgba(219,230,243,0.5)',
                height: 'auto',
                marginLeft: '15%',
                marginRight: '15%',
                marginBottom: '50px',
                paddingBottom: '10px',
                borderRadius: '10px',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.2)'
            }}>

                {/* {updatedAlirms.map((value, idx) => {
                    return <>
                        <hr style={{ borderTop: '1px solid rgba(0,0,0,0.1)', width: '100%' }} />
                        <AlirmItem alirm={value} key={idx} onClickYes={() => handleClickYes(value)} onClickNo={() => handleClickNo(value)} />
                    </>
                })} */}

                {updatedAlirms.map((value, idx) => { //역순으로 알림 배열
                    return (
                        <>
                            <hr style={{ borderTop: '1px solid rgba(0,0,0,0.1)', width: '100%' }} />
                            <AlirmItem alirm={value} key={idx} onClickYes={() => handleClickYes(value)} onClickNo={() => handleClickNo(value)} />
                        </>
                    );
                }).reverse()}




            </div>
        </>
    )
}