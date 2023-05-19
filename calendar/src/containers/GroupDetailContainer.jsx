import GroupDetail from "../components/GroupDetail/GroupDetail.jsx";
import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from '../axios.js';

const dummyGroup = {
    "originKey": "group1",
    "groupName": "그룹 생성 시험1",
    "description": "그룹 메모 시험1",
    "numOfUsers": 2,
    "leaderId": "terry8408@naver.com",
    "lastModifiedAt": "2023-05-15T08:11:58.987837",
    "createdAt": "2023-05-15T08:11:58.987824",
    "groupUsers": null
}
const dummy = [
    {
        userId: 'a@naver.com',
        groupSchedules: [
            {
                originKey: 'a-gs1',
                groupOriginKey: 'group1',
                name: 'a의 그룹 스케쥴1',
                startAt: '2023-05-17T16:00',
                endAt: '2023-05-17T17:00',
                memo: '메모1',
                allDayToggle: 0,
            },
            {
                originKey: 'a-gs2',
                groupOriginKey: 'group2',
                name: 'a의 그룹 스케쥴2',
                startAt: '2023-05-18T18:00',
                endAt: '2023-05-18T120:00',
                memo: '메모2',
                allDayToggle: 0,
            },
        ],
        userSchedules: [
            {
                originKey: 'us1',
                name: 'a의 스케쥴1',
                startAt: '2023-05-17T19:00',
                endAt: '2023-05-20T20:00',
                memo: '메모1',
                allDayToggle: 0,
            },
            {
                originKey: 'us2',
                name: 'a의 스케쥴2',
                startAt: '2023-05-18T12:00',
                endAt: '2023-05-18T18:00',
                memo: '메모2',
                allDayToggle: 0,
            },
        ],
    },
]

export default function GroupDetailContainer() {
    const [groupUserSchedule, setGroupUserSchedule] = useState([])
    const { groupId } = useParams()
    const [groupSchedule, setGroupSchedule] = useState([])
    const [group, setGroup] = useState({})
    useEffect(() => {
        // axios.get(`/group/${groupId}`).then((response) => {
        //     const group = response.data.data
        //     setGroup(group)
        // })

        axios.get(`/group/schedule/${groupId}`).then((response) => {
            const group = response.data.data
            setGroupSchedule(group)
        })

        axios.get(`/group/user/schedule/${groupId}`).then((response) => {
            console.log('response', response)

            const schedule = response.data.data
            setGroupUserSchedule(schedule)
        })

    }, []);

    return group && groupUserSchedule && groupSchedule && <GroupDetail group={group} groupUserSchedule={groupUserSchedule} groupSchedule={groupSchedule} />
}