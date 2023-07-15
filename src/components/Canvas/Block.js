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

const Block = ({ element, active, onDragStart, onClick, onDrag }) => {
    return (
        <StyledBlock
            data-testid={element.id}
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
};

const areEqual = (prevProps, nextProps) => {
    const { element: prevElement, active: prevActive } = prevProps;
    const { element: nextElement, active: nextActive } = nextProps;

    return (
        prevElement.x === nextElement.x &&
        prevElement.y === nextElement.y &&
        prevElement.width === nextElement.width &&
        prevElement.height === nextElement.height &&
        prevElement.o === nextElement.o &&
        prevElement.color === nextElement.color &&
        prevActive === nextActive
    );
};

export default React.memo(Block, areEqual);
