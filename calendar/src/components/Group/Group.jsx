import React, { useEffect } from "react"
import GroupModal from "../Modals/GroupModal";
import { useState } from "react";
import GroupItem from "./GroupItem";
import { Button } from "@mui/material";
import DeleteModal from "../Modals/DeleteModal";
import axios from '../../axios'

export default function Group({ groups }) {
    const [open, setOpen] = useState(false); // true면 모달 열림, false면 모달 닫힘
    const [editMode, setEditMode] = useState(false) // 수정할지 말지 알려줌
    const [updatedGroups, setUpdatedGroups] = useState(groups); //스케줄이 업데이트되었는지 
    const [selectedGroup, setSelectedGroup] = useState() //
    const [deleteMode, setDeleteMode] = useState(false) //삭제모드

    const handleClick = () => {
        setOpen(true)
        setEditMode(false)
    }

    const handleClose = () => {
        setOpen(false)
        setDeleteMode(false)
    }


    const handleSubmitGroup = ([group]) => {
        // 1. 모달을 닫는다
        setOpen(false)
        // 2. group을 업데이트한다
        if (editMode) {
            const idx = updatedGroups.findIndex((value) => value.originKey === group.originKey)
            const temp = [...updatedGroups]
            temp[idx] = group
            setUpdatedGroups(temp)
        }
        else {
            setUpdatedGroups([...updatedGroups, group])
        }

    }

    const handleClickDeleteGroup = (group) => { // 삭제 모달을 띄운다
        setOpen(false)
        setDeleteMode(true)
        setSelectedGroup(group)
    }

    const handleSubmitDeleteGroup = async (group) => {
        await axios.delete(`/group/${group.originKey}`)
        const idx = updatedGroups.findIndex((value) => value.originKey === group.originKey)

        const temp = { ...updatedGroups } //temp에 복사
        temp.splice(idx, 1)  //인덱스를 찾아 삭제
        setUpdatedGroups(temp) //그룹 정보 업뎃
    }

    const handleClickEditGroup = (group) => {
        setOpen(true)
        setEditMode(true)
        setSelectedGroup(group)
    }

    useEffect(() => {
        if (groups !== undefined) {
            setUpdatedGroups(groups)
        }
    }, [groups])

    return (
        <div style={{
            backgroundColor: 'rgba(219,230,243,0.5)',
            height: 'auto',
            marginLeft: '20%',
            marginRight: '20%',
            marginBottom: '50px',
            paddingBottom: '10px',
            borderRadius: '30px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.2)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'right', marginRight: '3%' }}>
                {open && <GroupModal group={selectedGroup} onClose={handleClose} editMode={editMode} onSubmitGroup={handleSubmitGroup} selectedGroup={selectedGroup} />}
                {deleteMode && <DeleteModal onSubmitDeleteGroup={handleSubmitDeleteGroup} onClose={handleClose} selectedGroup={selectedGroup} />}
                <Button
                    variant="text"
                    onClick={handleClick}
                    sx={{ cursor: 'pointer', fontFamily: 'var(--font-PoorStory)', fontWeight: 'bold', fontSize: '18px' }}

                >
                    그룹 추가
                </Button>
                <div></div>
            </div>
            <div>
                {updatedGroups.map((value, idx) => {
                    return <>
                        <hr style={{ borderTop: '1px solid rgba(0,0,0,0.1)', width: '100%' }} />
                        <GroupItem group={value} key={idx} onClickDeleteGroup={handleClickDeleteGroup} onClickEditGroup={handleClickEditGroup} />
                    </>
                })}
            </div>

        </div>
    )
}