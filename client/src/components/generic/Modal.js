import React from 'react'
import styled from "styled-components"
import { CloseIcon } from "../innerPieces/Icons"

const smallModal = { width: `${window.innerWidth * 0.3}px`, height: `${window.innerHeight * 0.3}px` }
const mediumModal = { width: `${window.innerWidth * 0.7}px`, height: `${window.innerHeight * 0.7}px` }
const largeModal = { width: `${window.innerWidth * 0.9}px`, height: `${window.innerHeight * 0.9}px` }

const ModalBackground = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    opacity: 1;
    overflow-x: hidden;
    overflow-y: auto;
`
const ModalArea = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: center;
    justify-content: center;
    align-content: center;
    width: ${props => {
        if (props.large) return largeModal.width;
        if (props.medium) return mediumModal.width;
        return smallModal.width;
    }};
    height: ${props => {
        if (props.large) return largeModal.height;
        if (props.medium) return mediumModal.height;
        return smallModal.height;
    }};
    background-color: #C9C9C9;
    box-shadow: inset 0px 0px 6px 2px rgba(0, 88, 121, 1);
`

const ModalContent = styled.div`
    margin: 1em;
`

const Modal = ({ onClose, children, small, medium, large }) => {
    return (
        <ModalBackground>
            <ModalArea small={small} medium={medium} large={large}>
                {children.map((child, index) => <ModalContent key={`modal${index}`}>{child}</ModalContent>)}
            </ModalArea>
            {onClose && <CloseIcon onClick={onClose} />}
        </ModalBackground>
    )
}

export default Modal