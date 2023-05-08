import React from "react";

export default function GroupItem({ group }) {
    return (
        <>
            {group.groupName}
            {group.description}
            {group.numOfUsers}

        </>
    )
}