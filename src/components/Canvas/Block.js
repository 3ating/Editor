import React from 'react';
import styled from 'styled-components';

const StyledBlock = styled.div`
    position: absolute;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    left: ${(props) => props.x}px;
    top: ${(props) => props.y}px;
    opacity: ${(props) => props.o};
    background: ${(props) => props.color};
    outline: ${(props) => (props.active ? 2 : 0)}px solid #b7b7b7cc;
    cursor: pointer;
`;

const Block = React.memo(({ element, active, onDragStart, onClick, onDrag }) => {
    return (
        <StyledBlock
            x={element.x}
            y={element.y}
            width={element.width}
            height={element.height}
            o={element.o}
            color={element.color}
            active={active}
            draggable
            onDragStart={onDragStart}
            onClick={onClick}
            onDrag={onDrag}
        />
    );
});

export default Block;
