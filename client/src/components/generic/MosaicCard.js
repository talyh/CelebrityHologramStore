import styled from "styled-components"

const MosaicCard = styled.div`
    display: grid;
    grid-template-rows: 2fr 1fr;
    background-color: #E8E8E8;
    -webkit-box-shadow: 8px 8px 6px -6px #777777;
    -moz-box-shadow: 8px 8px 6px -6px #777777;
     box-shadow: 8px 8px 6px -6px #777777;
    cursor:${props => props.onClick ? "pointer" : "normal"};
    height:${props => props.cellHeight}px;
    color: #707070;

    &:hover {
         transform: scale(${props => props.hoverScale}); 
         ${
    () => { props => props.onMouseOver }
    }
      }
`

export default MosaicCard