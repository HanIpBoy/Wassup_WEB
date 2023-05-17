import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupDetail from "../GroupDetail/GroupDetail";

export default function GroupItem({ group }) {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    // const [groupName, setGroupName] = useState()
    const [groupItemApi, setGroupItemApi] = useState();
    const groupItemRef = useRef();

    useEffect(() => {
        if (groupItemRef.current) {
            setGroupItemApi(groupItemRef.current.getApi())
        }
    }, [groupItemRef.current]);

    useEffect(() => {
        if (groupItemApi) {
            setEvents(events)
            return (
                <>
                </>
            )
        }
    }, [groupItemApi])

    const handleClickGroup = (event) => {
        return (
            <>
                {/* {setGroupName(group.groupName)} */}
                {console.log('GroupItem 클릭했음 : ' + group.groupName)}
                <GroupDetail groupName={group.groupName} />
                {navigate('/groups/' + group.originKey)}
            </>

        )
    }


    return (
        <>
            <div style={{ display: 'flex', fontSize: '20px' }}>
                <div onClick={handleClickGroup} style={{ margin: '10px', width: '33%', textAlign: 'center', cursor: 'pointer' }}>{group.groupName}</div>
                <div onClick={handleClickGroup} style={{ margin: '10px', width: '34%', textAlign: 'center', cursor: 'pointer' }}>{group.description}</div>
                <div style={{ margin: '10px', width: '33%', textAlign: 'center' }}>{group.numOfUsers}</div>
            </div>
        </>
    )
}