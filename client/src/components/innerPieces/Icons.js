import styled from "styled-components"
import Icon from "../generic/Icon"

export const SearchIcon = styled(Icon).attrs({
    id: "searchIcon",
    src: "search.png",
    alt: props => props.alt || "Search",
    style: {
        paddingTop: "1.3em",
        paddingBottom: "0.7em",
        marginLeft: "0.5em",
        marginRight: "0.5em"
    }
})`
`

export const CloseIcon = styled(Icon).attrs({
    id: "closeIcon",
    src: "close.png",
    alt: props => props.alt || "Close",
    style: {
        gridArea: "Close",
        margin: "0 0 auto auto"
    }
})`
`

export const RemoveIcon = styled(Icon).attrs({
    id: "removeIcon",
    src: "remove.png",
    alt: props => props.alt || "Remove",
    style: {
        gridArea: "Remove",
        margin: "auto 0 0 auto",
    }
})`
`

export const AddIcon = styled(Icon).attrs({
    id: "addIcon",
    src: "add.png",
    alt: props => props.alt || "Add",
    style: props => props.style
})`
`