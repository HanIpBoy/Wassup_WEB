import React from "react";
import Alirm from "../components/Alirm/Alirm.jsx";
import Header from "../components/Header/Header.jsx";
import { useState, useEffect } from "react";
import axios from "../axios.js";
export default function AlirmContainer() {
    const [alirms, setAlirms] = useState([])

    useEffect(() => {
        axios.get('user/notification/unread').then((response) => {
            console.log('response', response)
            setAlirms(response.data.data[0])
            console.log('data, dtatdatds', response)
        })
    }, []);

    return (
        <>
            <Header />
            <Alirm alirms={alirms} />
        </>
    )
} 