import React, { } from "react";

export default function AlirmItem({ alirm, onClickYes, onClickNo }) {
    const handleClickYes = () => {
        onClickYes(alirm)
    }

    const handleClickNo = () => {
        onClickNo(alirm)
    }

    console.log('알림은 무엇을 불러왔을까', alirm)
    return (
        <>
            <div style={{ display: 'flex', fontSize: '15px' }}>
                <div style={{ margin: '10px', width: '80%', textAlign: 'center' }}>
                    {alirm?.message}
                </div>
                <div onClick={handleClickYes} style={{ margin: '10px 0', width: '10%', textAlign: 'center', cursor: 'pointer', color: 'blue' }}>
                    예
                </div>
                <div onClick={handleClickNo} style={{ margin: '10px 0', width: '10%', textAlign: 'center', cursor: 'pointer', color: 'red' }}>
                    아니오
                </div>
            </div>
        </>
    )
}