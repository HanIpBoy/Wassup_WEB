import React, { useState } from "react";

export default function MemberIcon({ backgroundColor, userName }) {
    return (
        <div style={{ backgroundColor: backgroundColor, borderRadius: '100%', width: '45px', height: '45px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {userName.substring(1)}
        </div>
    )
}