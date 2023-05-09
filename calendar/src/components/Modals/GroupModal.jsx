import React, { useState } from 'react';
import { Modal, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button'
import MiniIcon from '../../images/MiniIcon.png';
import axios from 'axios';
import cookie from 'js-cookie'
import SearchModal from './SearchModal.jsx';

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
export default function GroupModal({ onClose, editMode }) {
    const initialInput = {
        groupName: '',
        description: '',
        groupUsers: [cookie.get('username')]
    }

    const [input, setInput] = useState(initialInput) // editMode, selectedSchedule가 true이면 들어있는 값으로 변경
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
        const payload = {
            groupName: input.groupName,
            description: input.description,
            numOfUsers: input.groupUsers.length,
            leaderId: cookie.get('username'),
            groupUsers: input.groupUsers
        }
        // [...input.groupUsers, leaderId]
        // 수정 모드일 때는 (editMode) PUT
        // 생성할 때는 POST

        let response

        if (editMode) {
            response = await axios.put('/group', payload)
        } else {
            response = await axios.post('/group', payload)
        }

        if (response.data.status === 'succeed') {
            // onSubmitSchedule(response.data.data)
        }
    }

    const handleClose = () => {
        setInput(initialInput)
        onClose()
    }

    const back = () => { //뒤로가기 함수
        setSearchUsers(false)
    }

    return (
        <div>
            {searchUsers === true ?
                <SearchModal back={back} />
                :
                <Modal
                    open={true}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={modalHeader}>
                            <Box sx={titleStyle} align="center" marginBottom={2} >
                                그룹 생성
                            </Box>
                            <img src={MiniIcon} style={{ width: '15%', height: '15%', marginLeft: '-5px', marginTop: '-11px' }} />
                        </div>
                        <TextField id="filled-basic"
                            name='groupName'
                            value={input.groupName}
                            label="그룹이름"
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
                        <Button
                            variant='contained'
                            fullWidth
                            sx={{ mt: 3, height: 45, fontSize: 16 }}
                            onClick={handleSearch}
                        >
                            사용자 검색하기
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, height: 45, fontSize: 16 }}
                            onClick={handleSubmit}
                        >{editMode ? '그룹 수정' : '그룹 추가'}</Button>
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