import React from "react"
import Button from "../generic/Button"

// provide a library of buttons to be used throughout the application

export const RemoveButton = ({ onClick }) => <Button value="Remove" color="#790041" onClick={() => onClick()} />

export const CancelButton = ({ onClick }) => <Button value="Cancel" color="#790041" onClick={() => onClick()} />

export const SaveButton = ({ onClick }) => <Button value="Add" onClick={() => onClick()} />

export const OkButton = ({ onClick }) => <Button value="Ok" onClick={() => onClick()} />