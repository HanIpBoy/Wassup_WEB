import React from "react";

export default function Avatar({ backgroundColor, userName, onClick }) {
    const handleClickAvartar = () => {
        onClick(backgroundColor)
    }
    return (
        <div onClick={handleClickAvartar} style={{ backgroundColor: backgroundColor, borderRadius: '100%', width: '45px', height: '45px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            {userName.substring(1)}
        </div>
    )
}