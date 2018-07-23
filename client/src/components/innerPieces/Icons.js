import styled from "styled-components"
import Icon from "../generic/Icon"

export const SearchIcon = styled(Icon).attrs({
    id: "searchIcon",
    src: "search.png",
    alt: "Search",
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
    alt: "Close",
    style: {
        gridArea: "Close",
        margin: "0 0 auto auto"
    }
})`
`

export const RemoveIcon = styled(Icon).attrs({
    id: "removeIcon",
    src: "remove.png",
    alt: "Remove",
    style: {
        paddingTop: "1.3em",
        paddingBottom: "0.7em",
        margin: "0 auto",
        gridArea: "Remove"
    }
})`
`

export const AddIcon = styled(Icon).attrs({
    id: "addIcon",
    src: "add.png",
    alt: "Add",
    size: {
        width: "5em",
        heigth: "5em"
    },
    style: {
        alignSelf: "center",
        margin: "0 auto"
    }
})`
`