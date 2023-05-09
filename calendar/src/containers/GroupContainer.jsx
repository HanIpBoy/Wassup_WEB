import React, { useState, useEffect } from 'react'
import Group from "../components/Group/Group.jsx";
import Header from "../components/Header/Header.jsx";

const dummy = [ //더미 데이터
    {
        originKey: "1",
        groupName: "한성대 동아리",
        description: "2023학년도 새로운 동아리",
        numOfUsers: 4,
        leaderId: "me@gmail.com",
        lastModifiedAt: "2023-05-05T19:30:45.653908",
        createdAt: "2023-05-05T19:30:45.653908",
        groupUsers: ["me@gmail.com", "a@naver.com", "b@google.com", "c@nate.com"]
    },
    {
        originKey: "2",
        groupName: "그룹2",
        description: "그룹 2입니당",
        numOfUsers: 2,
        leaderId: "me@gmail.com",
        lastModifiedAt: "2023-05-05T19:30:45.653908",
        createdAt: "2023-05-05T19:30:45.653908",
        groupUsers: ["me@gmail.com", "a@naver.com"]
    }
]
export default function GroupContainer() {
    const [groups, setGroups] = useState(dummy)

    useEffect(() => {
        // axios.get('/group').then((response) => {
        //     console.log('response', response)
        //     setGroup(response.data.data)
        // })
    }, []);

    return (
        <>
            <Header />
            <Group groups={groups} />
        </>
    )
}