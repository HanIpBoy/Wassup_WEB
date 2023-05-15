import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupDetail from "../GroupDetail/GroupDetail";

export default function GroupItem({ group }) {
    const navigate = useNavigate()
    const [groupName, setGroupName] = useState()
    const handleClickGroup = (event) => {
        navigate('/groups/' + group.originKey)
        setGroupName(group.groupName)
        return (
            <GroupDetail groupName={groupName} />
        )
    }


    return (
        <>
            <div style={{ display: 'flex', fontSize: '20px' }}>
                <div style={{ margin: '10px', width: '33%', textAlign: 'center' }}>{group.groupName}</div>
                <div onClick={handleClickGroup} style={{ margin: '10px', width: '34%', textAlign: 'center', cursor: 'pointer' }}>{group.description}</div>
                <div style={{ margin: '10px', width: '33%', textAlign: 'center' }}>{group.numOfUsers}</div>
            </div>
        </>
    )
}