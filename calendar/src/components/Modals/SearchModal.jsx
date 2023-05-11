import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button'
import axios from '../../axios.js';
import Avartar from '../Avatar.jsx';
import { COLOR_CODE_LIST } from '../../constants.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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


const dummy = {
    userId: 'abdsafasd@naver.com',
    userName: '김정한'
}

export default function SearchModal({ back }) {
    const [searchResult, setSearchResult] = useState()
    const [input, setInput] = useState('')
    const [users, setUsers] = useState([])
    const [addMode, setAddMode] = useState(true)
    useEffect(() => {
        axios.get('/user').then(console.log)
    }, [])

    const handleSearch = async () => {
        const response = await axios.post(`/user/search`, { userId: input })
        const result = result.data
        // const result = dummy
        setSearchResult(result)
        const find = users.find((item) => searchResult.userId === item.userId)
        setAddMode(find === undefined)
    }

    const handleInput = (event) => {
        setInput(event.target.value)
    }

    const handleClickAddUser = (event) => {
        // users에 searchResult를 추가한다
        if (users.length < 10) {
            setUsers([...users, searchResult])
        }

    }

    const handleClickAvartar = (backgroundColor) => {
        // Array.find((item) => true)
        const idx = users.findIndex((item) => item.backgroundColor === backgroundColor)
        // users에서 idx번째 원소를 삭제하면 된다
        const tempUsers = [...users]
        tempUsers.splice(idx, 1)
        setUsers(tempUsers)
    }

    return (
        <>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ArrowBackIcon
                        onClick={back}
                        sx={{ cursor: 'pointer', ":hover": { transition: 'background-color 0.4s ease ', backgroundColor: 'lightgray', borderRadius: '100%' } }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
                        <TextField id="filled-basic"
                            variant='filled'
                            margin="dense"
                            fullWidth
                            label="사용자 이름을 입력해주세요."
                            onInput={handleInput}
                        />
                        <Button
                            variant="contained"
                            sx={{ height: '55px', fontSize: 16, mt: '5px' }}
                            onClick={handleSearch}
                        >검색</Button>
                    </div>
                    {searchResult && //searchResult값이 있을 경우에만 렌더링
                        <div className='result'>
                            {searchResult.userName}
                            {searchResult.userId}
                            {
                                addMode === true && <Button
                                    ariant="contained"
                                    sx={{ height: '50px', fontSize: 16 }}
                                    onClick={handleClickAddUser}
                                >추가</Button>
                            }

                        </div>
                    }
                    <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '30px', rowGap: '15px', padding: '0 25px' }}>
                        {users.map((value, idx) => {
                            return <Avartar onClick={handleClickAvartar} backgroundColor={COLOR_CODE_LIST[idx]} userName={value.userName} key={idx} />
                        })}
                    </div>
                </Box>
            </Modal>
        </>
    )
}