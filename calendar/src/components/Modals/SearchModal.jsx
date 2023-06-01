import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button'
import axios from '../../axios.js';
import Avartar from '../Avatar.jsx';
import { COLOR_CODE_LIST } from '../../constants.js';
import cookie from 'js-cookie'

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



export default function SearchModal({ onSubmit }) {
    const [searchResult, setSearchResult] = useState()
    const [input, setInput] = useState('')
    const [users, setUsers] = useState([])
    const [addMode, setAddMode] = useState(true)

    useEffect(() => {
        const me = {
            userId: cookie.get('userId'),
            userName: cookie.get('username'),
        }
        setUsers([me])
        axios.get('/user').then(console.log)

    }, [])

    useEffect(() => {
        if (searchResult) {
            const find = users.find((user) => searchResult.userId === user.userId)
            setAddMode(!find)
        }
    }, [users, searchResult])

    const handleSearch = async () => {
        const response = await axios.get(`/user/search/${input}`)
        const result = response.data.data[0]
        // const result = dummy


        if (response.data.data === null) {
            window.alert('검색한 사용자가 존재하지 않습니다.')
        }
        setSearchResult(result)
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

    const handleSubmit = () => {
        onSubmit(users)
    }


    const handleClickAvartar = (userId) => {
        if (userId !== cookie.get('userId')) {
            // Array.find((item) => true)
            const idx = users.findIndex((item) => item.userId === userId)
            // users에서 idx번째 원소를 삭제하면 된다
            const tempUsers = [...users]
            tempUsers.splice(idx, 1)
            setUsers(tempUsers)
        }
    }

    return (
        <>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <ArrowBackIcon
                        onClick={handleSubmit}
                        sx={{ cursor: 'pointer', ":hover": { transition: 'background-color 0.4s ease ', backgroundColor: 'lightgray', borderRadius: '100%' } }}
                    /> */}
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
                            sx={{ height: '55px', fontSize: 16, mt: '5px', whiteSpace: 'nowrap' }}
                            onClick={handleSearch}
                        >검색</Button>
                    </div>
                    {searchResult && //searchResult값이 있을 경우에만 렌더링
                        <div className='result' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: '20px', margin: '10px auto' }}>
                            <div>{searchResult.userName}</div>
                            <div>{searchResult.userId}</div>
                            <div>
                                {
                                    addMode === true && <Button
                                        ariant="contained"
                                        sx={{ height: '15px', fontSize: 16 }}
                                        onClick={handleClickAddUser}
                                    >추가</Button>
                                }
                            </div>

                        </div>
                    }
                    <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '30px', rowGap: '15px', padding: '10px 25px' }}>
                        {users.map((value, idx) => {
                            return <Avartar onClick={handleClickAvartar} backgroundColor={COLOR_CODE_LIST[idx]} userName={value.userName} userId={value.userId} key={value.userId} />
                        })}
                    </div>

                    <Button
                        onClick={handleSubmit}
                        variant="text"
                        fullWidth
                        sx={{ fontSize: 16, mt: '5px', }}
                    >저장
                    </Button>
                </Box>
            </Modal>
        </>
    )
}