import React from "react"
import GroupModal from "../Modals/GroupModal";
import { useState } from "react";
import GroupItem from "./GroupItem";
import { Button } from "@mui/material";

export default function Group({ groups }) {
    const [open, setOpen] = useState(false); // true면 모달 열림, false면 모달 닫힘
    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            {open && <GroupModal onClose={handleClose} />}
            <div>
                {groups.map((value, idx) => {
                    return <GroupItem group={value} key={idx} />
                })}
            </div>
            <Button
                variant="contained"
                onClick={handleClick}
            >
                그룹 추가
            </Button>
        </>
    )
}