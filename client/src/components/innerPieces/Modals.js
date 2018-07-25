import React from "react"
import styled from "styled-components"
import Modal from "../generic/Modal"
import { OkButton, CancelButton } from "./Buttons"

// provide a library of modals to be used throughout the application

// provide a styled Message to be used within Modals
const Message = styled.div`
    font-size: 1.2em;
    white-space: wrap;
`

export const MessageModal = ({ message, onClick }) => {
    return (
        <Modal small >
            <Message>{message}</Message>
            <OkButton onClick={onClick} />
        </Modal>
    )
}

export const ConfirmationModal = ({ message, onCancel, onConfirm }) => {
    return (
        <Modal small >
            <Message>{message}</Message>
            <div>
                <CancelButton onClick={onCancel} />
                <OkButton onClick={onConfirm} />
            </div>
        </Modal>
    )
}