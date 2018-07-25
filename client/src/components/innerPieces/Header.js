import styled from "styled-components"

// provide a styled version of the header
const Header = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 4fr 1fr;
    grid-template-areas: "Title Title Title Title Title"
                        "Subtitle Subtitle Subtitle Search Search";
    padding: 2em;
    position: fixed;
    z-index: 1;
    left:0;
    right:0;
    background-color:#005879;
    color:white;
`
export default Header
