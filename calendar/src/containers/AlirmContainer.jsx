import React from "react";
import Alirm from "../components/Alirm/Alirm.jsx";
import Header from "../components/Header/Header.jsx";
import { useState, useEffect } from "react";
import axios from "../axios.js";
export default function AlirmContainer() {
    const [alirms, setAlirms] = useState([])

    useEffect(() => {
        axios.get('user/notification/unread').then((response) => {
            setAlirms(response.data.data)
        })
    }, []);

    return (
        <>
            <Header />
            <Alirm alirms={alirms} />
        </>
    )
} 