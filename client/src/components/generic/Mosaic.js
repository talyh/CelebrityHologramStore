import React, { Component } from "react"
import styled from "styled-components"

// provide a basic mosaic style, with the desired number of rows and columns
const StyledMosaic = styled.div`
    display: grid;
    grid-template-rows: repeat(${props => props.rows}, 1fr);
    grid-template-columns: repeat(${props => props.columns}, 1fr);
    column-gap: ${props => props.gap}px;
    row-gap: ${props => props.gap}px;
`

class Mosaic extends Component {

    determineColumns = (width, area) => Math.floor(area / width)

    determineGrid = (width, gap, itemsAmount, area) => {
        const columns = this.determineColumns(width + gap, area)
        return ({ rows: Math.ceil(itemsAmount / columns), columns: columns })
    }

    render() {
        const { size, gap, itemsAmount, area, id, children } = this.props

        // determine the grid, taking into consideration what's the area it'll be contained in,
        // the amount of items to show, the desired width of the cards and the gap between them
        const grid = this.determineGrid(size.width, gap, itemsAmount, area)

        return (
            <StyledMosaic rows={grid.rows} columns={grid.columns} gap={gap} id={id}>
                {children}
            </StyledMosaic >)
    }
}

export default Mosaic