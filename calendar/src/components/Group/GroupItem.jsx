import React from "react";
import { useNavigate } from "react-router-dom";

export default function GroupItem({ group }) {
    const navigate = useNavigate()
    const handleClickGroup = (event) => {
        navigate('/groups/' + group.originKey)
    }

    return (
        <div style={{ display: 'flex', fontSize: '20px' }}>
            <div style={{ margin: '10px', width: '33%', textAlign: 'center' }}>{group.groupName}</div>
            <div onClick={handleClickGroup} style={{ margin: '10px', width: '34%', textAlign: 'center', cursor: 'pointer' }}>{group.description}</div>
            <div style={{ margin: '10px', width: '33%', textAlign: 'center' }}>{group.numOfUsers}</div>
        </div>
    )
}