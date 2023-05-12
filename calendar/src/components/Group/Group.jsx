import React from "react"
import GroupModal from "../Modals/GroupModal";
import { useState } from "react";
import GroupItem from "./GroupItem";
import { Button } from "@mui/material";

export default function Group({ groups }) {
    const [open, setOpen] = useState(false); // true면 모달 열림, false면 모달 닫힘
    const [editMode, setEditMode] = useState(false) // 수정할지 말지 알려줌
    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div style={{
            backgroundColor: 'rgba(219,230,243,0.5)',
            height: '550px',
            marginLeft: '50px',
            marginRight: '50px',
            borderRadius: '30px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
            fontFamily: 'var(--font-PoorStory);'
        }}>
            <div style={{ display: 'flex', justifyContent: 'right', marginRight: '50px' }}>
                {open && <GroupModal onClose={handleClose} editMode={editMode} />}
                <Button
                    variant="text"
                    onClick={handleClick}
                    sx={{ cursor: 'pointer', fontFamily: 'var(--font-PoorStory);' }}

                >
                    그룹 추가
                </Button>
                <div></div>
            </div>
            <div>
                {groups.map((value, idx) => {
                    return <>
                        <hr style={{ borderTop: '1px solid rgba(0,0,0,0.1)', width: '100%' }} />
                        <GroupItem group={value} key={idx} />
                    </>
                })}
            </div>

        </div>
    )
}