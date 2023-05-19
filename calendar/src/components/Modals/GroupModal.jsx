import React, { useState } from 'react';
import { Modal, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button'
import MiniIcon from '../../images/MiniIcon.png';
import axios from '../../axios';
import cookie from 'js-cookie'
import SearchModal from './SearchModal.jsx';
import Avartar from '../Avatar';
import { COLOR_CODE_LIST } from '../../constants';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

const titleStyle = {
    fontSize: 24,
    color: 'primary.main'
}

const modalHeader = {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    marginLeft: '38%'
}


// TODO: response에 memo 데이터 없음
export default function GroupModal({ group, onClose, editMode, selectedGroup, onSubmitGroup }) {
    const initialInput = {
        groupName: '',
        description: '',
        groupUsers: []
    }

    const handleGroupUsers = (users) => {
        setSearchUsers(false)
        setInput({ ...input, groupUsers: users })
    }

    //TODO: 서버 고쳐지면 아래 주석으로 사용하기
    const [input, setInput] = useState(editMode && selectedGroup ? { ...selectedGroup, groupUsers: [] } : initialInput) // editMode, selectedSchedule가 true이면 들어있는 값으로 변경
    // const [input, setInput] = useState(editMode && selectedGroup ? selectedGroup : initialInput) // editMode, selectedSchedule가 true이면 들어있는 값으로 변경
    const [searchUsers, setSearchUsers] = useState(false)

    const handleInput = (event) => {
        const { value, name } = event.target
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSearch = (event) => {
        setSearchUsers(true)
    }

    const handleSubmit = async (event) => {
        const payload = { //서버의 /group 으로 보내는 페이로드
            originKey: group.originKey,
            groupName: input.groupName,
            description: input.description,
            numOfUsers: input.groupUsers.length,
            leaderId: cookie.get('userId'),
            groupUsers: input.groupUsers.map(user => user.userId.toString())
        }
        // [...input.groupUsers, leaderId]
        // 수정 모드일 때는 (editMode) PUT
        // 생성할 때는 POST

        let response

        if (editMode) { //수정할 땐 put
            response = await axios.put('/group', payload)
        } else { //추가할 땐 post
            response = await axios.post('/group/createRequest', payload)
        }

        if (response.data.status === 'succeed') { //서버 응답 성공시 onSubmitGroup 실행
            onSubmitGroup(response.data.data)
        }
    }

    const handleClose = () => {
        setInput(initialInput)
        onClose()
    }

    const handleClickRemove = (userId) => {
        if (userId !== cookie.get('userId')) {
            // Array.find((item) => true)
            const idx = input.groupUsers.findIndex((item) => item.userId === userId)
            // users에서 idx번째 원소를 삭제하면 된다
            const tempUsers = [...input.groupUsers]
            tempUsers.splice(idx, 1)
            setInput({ ...input, groupUsers: tempUsers })
        }
    }

    return (
        <div>
            {searchUsers === true ?
                <SearchModal onSubmit={handleGroupUsers} />
                :
                <Modal
                    open={true}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {!editMode &&
                            <div style={modalHeader}>
                                <Box sx={titleStyle} align="center" marginBottom={2} >
                                    그룹 생성
                                </Box>
                                <img src={MiniIcon} style={{ width: '15%', height: '15%', marginLeft: '-5px', marginTop: '-11px' }} />
                            </div>
                        }
                        <TextField id="filled-basic"
                            name='groupName'
                            value={input.groupName}
                            label="그룹 이름"
                            variant='filled'
                            margin="dense"
                            required
                            fullWidth
                            onInput={handleInput}
                        />
                        <br />
                        <TextField id="filled-basic"
                            name='description'
                            value={input.description}
                            label="메모"
                            variant='filled'
                            margin="dense"
                            fullWidth
                            sx={{ mt: 2.5 }}
                            onInput={handleInput}
                        />
                        {!editMode && <Button
                            variant='text'
                            fullWidth
                            sx={{ mt: 3, height: 45, fontSize: 16, color: 'gray' }}
                            onClick={handleSearch}
                        >
                            사용자 검색하기
                        </Button>}
                        <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '30px', rowGap: '15px', padding: '0 25px', paddingTop: '10px' }}>
                            {input.groupUsers.map((value, idx) => {
                                return <Avartar onClick={handleClickRemove} backgroundColor={COLOR_CODE_LIST[idx]} userName={value.userName} userId={value.userId} key={value.userId} />
                            })}
                        </div>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, height: 45, fontSize: 16 }}
                            onClick={handleSubmit}
                        >{editMode ? '수정' : '추가'}</Button>
                        {/* 삼항연산자 사용, editMode에 따라 수정, 추가 버튼 변경 */}
                        {editMode && (
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mt: 1, height: 45, fontSize: 16 }}
                            >
                                그룹 삭제
                            </Button>
                        )}
                    </Box>
                </Modal>
            }
        </div>
    );
}