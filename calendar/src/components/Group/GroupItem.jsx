import React from "react";

export default function GroupItem({ group }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ margin: '10px' }}>{group.groupName}</div>
            <div style={{ margin: '10px' }}>{group.description}</div>
            <div style={{ margin: '10px' }}>{group.numOfUsers}</div>
        </div>
    )
}