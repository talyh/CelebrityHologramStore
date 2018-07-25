import styled from "styled-components"
import { cardModes } from "../../constants"

// provide a styled version of the celebrity picture, adjustable depending on the mode
const CelebrityPicture = styled.img`
    grid-area: Picture;
    width: ${props => props.mode === cardModes.preview ? "100px" : "200px"};
    height: ${props => props.mode === cardModes.preview ? "148px" : "296px"};
    padding-top: ${props => props.mode === cardModes.preview ? "none" : "30px"};
    pointer-events: none;
`

export default CelebrityPicture