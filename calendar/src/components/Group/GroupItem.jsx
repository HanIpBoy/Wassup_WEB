import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupDetail from "../GroupDetail/GroupDetail";
import btn_edit from '../../images/btn_edit.png';
import btn_delete from '../../images/btn_delete.png';
import icon_groupmembers from '../../images/icon_groupmembers.png';
import axios from "../../axios.js";
import GroupModal from "../Modals/GroupModal";
import { Modal } from "@mui/material";
import DeleteModal from "../Modals/DeleteModal";

export default function GroupItem({ group, onSubmitDeleteGroup }) {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    // const [groupName, setGroupName] = useState()
    const [groupItemApi, setGroupItemApi] = useState();
    const [open, setOpen] = useState(false);
    const [updatedGroupSchedules, setUpdatedGroupSchedules] = useState([])
    const [editMode, setEditMode] = useState(false)

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

    const handleSubmitGroupSchedule = ([group]) => { //그룹일정을 보내주는 함수
        setOpen(false) //모달을 닫는다
        setUpdatedGroupSchedules([...setUpdatedGroupSchedules, group])
    }

    const handleClickGroup = (event) => { //그룹 이름이나 그룹 메모를 클릭했을 때 작동하는 핸들러
        setEditMode(true)
        setOpen(true)

        return (
            open && <GroupModal editMode={editMode} />
        )

    }

    const handleClickEditGroup = () => { //그룹 수정 핸들러
        setEditMode(true)
        setOpen(true)
        return (
            <GroupModal editMode={editMode} />
        )
    }

    const handleClickDeleteGroup = (event) => { //그룹 삭제 핸들러
        setOpen(true)
        return (
            <DeleteModal />
        )
    }

    return (
        <>
            <div style={{ display: 'flex', fontSize: '20px' }}>
                <div onClick={handleClickGroup} style={{ margin: '10px', width: '33%', textAlign: 'center', cursor: 'pointer' }}>{group.groupName}</div>
                <div onClick={handleClickGroup} style={{ margin: '10px', marginRight: '50px', width: '34%', textAlign: 'center', cursor: 'pointer' }}>{group.description}</div>
                <div style={{ margin: '10px', marginRight: '-100px' }}>
                    <img src={icon_groupmembers}></img>
                </div>
                <div style={{ margin: '10px', marginRight: '-50px', width: '33%', textAlign: 'center' }}>{group.numOfUsers}</div>
                <div onClick={handleClickEditGroup} style={{ margin: '10px', marginRight: '5px', cursor: 'pointer' }}>
                    <img src={btn_edit}></img>
                </div>
                <div onClick={handleClickDeleteGroup} style={{ margin: '10px', marginLeft: '5px', cursor: 'pointer' }}>
                    <img src={btn_delete}></img>
                </div>
            </div>
        </>
    )
}