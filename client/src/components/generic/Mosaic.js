import React, { Component } from "react"
import styled from "styled-components"

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
        const grid = this.determineGrid(size.width, gap, itemsAmount, area)

        return (
            <StyledMosaic rows={grid.rows} columns={grid.columns} gap={gap} id={id}>
                {children}
            </StyledMosaic >)
    }
}

export default Mosaic