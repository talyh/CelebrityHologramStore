import React from "react"
import styled from "styled-components"
import Modal from "../generic/Modal"
import { OkButton } from "./Buttons"

const Message = styled.div`
    font-size: 1.2em;
    white-space: wrap;
`

const MessageModal = ({ message, onClick }) => {
    return (
        <Modal small >
            <Message>{message}</Message>
            <OkButton onClick={onClick} />
        </Modal>
    )
}

export default MessageModal