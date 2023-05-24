import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import AlirmItem from './AlirmItem.jsx';

export default function Alirm(alirms) {

    const [updatedAlirms, setUpdatedAlirms] = useState(alirms) //업데이트된 알람 상태 저장

    useEffect(() => {
        if (alirms !== undefined) {
            setUpdatedAlirms(alirms)
        }
    }, [alirms])

    const handleClickYes = () => { //예 버튼 클릭시 작동되는 핸들러

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
                    return <>
                        <hr style={{ borderTop: '1px solid rgba(0,0,0,0.1)', width: '100%' }} />
                        <AlirmItem alrim={value} key={idx} onClickYes={handleClickYes} onClickNo={handleClickNo} />
                    </>
                })}
            </div>
        </>
    )
}