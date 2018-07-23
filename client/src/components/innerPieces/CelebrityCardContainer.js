import Card from "../generic/MosaicCard"
import { cardModes } from "../../constants"

const CelebrityCardContainer = Card.extend`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns:  ${props => props.mode === cardModes.small ? "2fr 2fr 2fr" : "1fr 3fr 1fr"};
    grid-template-areas: ${props => {
        if (props.mode === cardModes.small) {
            return " 'Picture Name Name'              'Picture Roles .'             'Picture Roles Remove' "
        }
        else {
            return " 'Picture Name Close'         'Picture Roles Close'            'Picture More Remove' "
        }
    }};
    column-gap: ${props => props.mode === cardModes.small ? "1em" : "3em"};
    font-size: ${props => props.mode === cardModes.small ? "0.8em" : "1.2em"};
    padding: 1.5em;
`

export default CelebrityCardContainer