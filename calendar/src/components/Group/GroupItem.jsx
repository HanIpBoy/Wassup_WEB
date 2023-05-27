import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupDetail from "../GroupDetail/GroupDetail";
import btn_edit from '../../images/btn_edit.png';
import btn_delete from '../../images/btn_delete.png';
import icon_groupmembers from '../../images/icon_groupmembers.png';
import axios from "../../axios.js";
import cookie from 'js-cookie';

export default function GroupItem({ group, onClickDeleteGroup, onClickEditGroup }) {
    const navigate = useNavigate()
    const [groupMembers, setGroupMembers] = useState([])

    const handleClickGroup = async (event) => { //그룹 이름이나 그룹 메모를 클릭했을 때 작동하는 핸들러
        const payload = {
            groupUsers: group.groupUsers
        }
        let response = await axios.post('/group/search/userName', payload)
        if (response.data.status === 'succeed') {
            setGroupMembers(response.data.data[0])
        }
        navigate(`/groups/${group.originKey}`)
    }

    const handleClickEditGroup = () => { //그룹 수정 핸들러
        onClickEditGroup(group)
    }

    const handleClickDeleteGroup = () => { //그룹 삭제 핸들러
        onClickDeleteGroup(group)
    }

    const userId = cookie.get('userId')

    return (
        <>
            <div style={{ display: 'flex', fontSize: '20px' }}>
                <div onClick={handleClickGroup} style={{ margin: '10px', width: '33%', textAlign: 'center', cursor: 'pointer' }}>{group.groupName}</div>
                <div onClick={handleClickGroup} style={{ margin: '10px', marginRight: '50px', width: '34%', textAlign: 'center', cursor: 'pointer' }}>{group.description}</div>
                <div style={{ margin: '10px', marginRight: '-100px' }}>
                    <img src={icon_groupmembers}></img>
                </div>
                <div style={{ margin: '10px', marginRight: '-50px', width: '33%', textAlign: 'center' }}>{group.numOfUsers}</div>
                {group.leaderId === userId ?
                    <div onClick={handleClickEditGroup} style={{ margin: '10px', marginRight: '5px', cursor: 'pointer' }}>
                        <img src={btn_edit}></img>
                    </div>
                    :
                    ''
                }
                {group.leaderId === userId ?
                    <div onClick={handleClickDeleteGroup} style={{ margin: '10px', marginLeft: '5px', cursor: 'pointer' }}>
                        <img src={btn_delete}></img>
                    </div>
                    :
                    ''
                }

            </div>
        </>
    )
}