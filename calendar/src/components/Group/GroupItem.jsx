import React from "react";

export default function GroupItem({ group }) {
    return (
        <div style={{ display: 'flex', fontSize: '20px' }}>
            <div style={{ margin: '10px', width: '33%', textAlign: 'center' }}>{group.groupName}</div>
            <div style={{ margin: '10px', width: '34%', textAlign: 'center' }}>{group.description}</div>
            <div style={{ margin: '10px', width: '33%', textAlign: 'center' }}>{group.numOfUsers}</div>
        </div>
    )
}