import styled from "styled-components"
import { cardModes } from "../../constants"

const CelebrityPicture = styled.img`
    grid-area: Picture;
    width: ${props => props.mode === cardModes.small ? "100px" : "200px"};
    padding-top: ${props => props.mode === cardModes.big ? "30px" : "none"};
    pointer-events: none;
`

export default CelebrityPicture