import React from "react"
import Button from "../generic/Button"

export const RemoveButton = ({ onClick }) => <Button value="Remove" color="#790041" onClick={() => onClick()} />

export const CancelButton = ({ onClick }) => <Button value="Cancel" color="#790041" onClick={() => onClick()} />

export const SaveButton = ({ onClick }) => <Button value="Add" onClick={() => onClick()} />