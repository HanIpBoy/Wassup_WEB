import React, { } from "react";

export default function AlarmItem({ group, onClickDeleteGroup, onClickEditGroup }) {

    return (
        <>
            <div style={{ display: 'flex', fontSize: '15px' }}>
                <div style={{ margin: '10px', width: '80%', textAlign: 'center' }}>
                    이윤재님이 그룹 초대를 신청하셨습니다. 수락하시겠습니까?
                </div>
                <div style={{ margin: '10px 0', width: '10%', textAlign: 'center', cursor: 'pointer', color: 'blue' }}>
                    예
                </div>
                <div style={{ margin: '10px 0', width: '10%', textAlign: 'center', cursor: 'pointer', color: 'red' }}>
                    아니오
                </div>
            </div>
        </>
    )
}