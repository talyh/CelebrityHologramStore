import styled from "styled-components"
import { cardModes } from "../../constants"

const CelebrityPicture = styled.img`
    grid-area: Picture;
    width: ${props => props.mode === cardModes.small ? "100px" : "200px"};
    height: ${props => props.mode === cardModes.small ? "148px" : "296px"};
    padding-top: ${props => props.mode === cardModes.small ? "none" : "30px"};
    pointer-events: none;
`

export default CelebrityPicture