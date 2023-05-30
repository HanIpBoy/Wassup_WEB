import React, { useState } from "react";

export default function AlirmItem({ alirm, onClickYes, onClickNo }) {

    const handleClickYes = () => {
        onClickYes(alirm)
    }

    const handleClickNo = () => {
        onClickNo(alirm)
    }
    console.log('AlirmItem 에서 들어온 alirm은? ', alirm)
    return (
        <>
            <div style={{ display: 'flex', fontSize: '15px' }}>
                <div style={{ margin: '10px', width: '80%', textAlign: 'center' }}>
                    {alirm?.message}
                </div>
                {alirm.title === '그룹 초대' ?
                    <div onClick={handleClickYes} style={{ margin: '10px 0', width: '10%', textAlign: 'center', cursor: 'pointer', color: 'blue' }}>
                        수락
                    </div>
                    :
                    <div style={{ margin: '10px 0', width: '10%', textAlign: 'center' }}>

                    </div>
                }
                <div onClick={handleClickNo} style={{ margin: '10px 0', width: '10%', textAlign: 'center', cursor: 'pointer', color: 'red' }}>
                    {alirm.title === '그룹 초대' ? '거절' : '삭제'}
                </div>
            </div>
        </>
    )
}