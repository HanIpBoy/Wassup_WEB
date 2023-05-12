import React from "react";

export default function GroupItem({ group }) {
    const handleClickGroup = (event) => {

    }

    return (
        <div style={{ display: 'flex', fontSize: '20px' }}>
            <div style={{ margin: '10px', width: '33%', textAlign: 'center' }}>{group.groupName}</div>
            <div onClick={handleClickGroup} style={{ margin: '10px', width: '34%', textAlign: 'center', cursor: 'pointer' }}>{group.description}</div>
            <div style={{ margin: '10px', width: '33%', textAlign: 'center' }}>{group.numOfUsers}</div>
        </div>
    )
}